import { BreathDataChannel } from "./channels/breath_data_channel";
import { ChannelManager } from "./channels/channel_manager";
import { SensorDataChannel } from "./channels/sensor_data_channel";
import { BreathData } from "./data/breath_data";
import { SensorData } from "./data/sensor_data";
import { UDPChannelManager } from "./managers/udp_channel/udp_channel_manager";
import { WebsocketManager } from "./managers/websocket_manager/websocket_manager";

// PARAMS
const VENTILATOR_IP = "localhost";//"192.168.0.101"
const SENSOR_DATA_PORT = 10000;
const BREATH_DATA_PORT = 10001;
const ALARM_CHANNEL_PORT = 10002;
const MACHINE_STATUS_CHANNEL_PORT = 10003;
const DEBUG_CHANNEL_PORT = 10004;
const MACHINE_CONTROL_CHANNEL_PORT = 10005;

// Create all channels
const sensorDataChannel = new SensorDataChannel(new UDPChannelManager(SENSOR_DATA_PORT, VENTILATOR_IP));
const breathDataChannel = new BreathDataChannel(new UDPChannelManager(BREATH_DATA_PORT, VENTILATOR_IP));
const alarmChannel = new UDPChannelManager(ALARM_CHANNEL_PORT, VENTILATOR_IP);
const machineStatusChannel = new UDPChannelManager(MACHINE_STATUS_CHANNEL_PORT, VENTILATOR_IP);
const debugChannel = new UDPChannelManager(DEBUG_CHANNEL_PORT, VENTILATOR_IP);
const channelManager = new ChannelManager(sensorDataChannel);

// Create the websocket server
const websocketManager = new WebsocketManager(8000);

function main() {
    channelManager.init()
    channelManager.onNewSensorData(handleSensorData);

    breathDataChannel.onNewBreathData(handleBreathData);
    websocketManager.init();
}

/**
 * Handles incoming sensor data from the ventilator
 * @param data Sensor Data
 */
function handleSensorData(data: SensorData) {
    websocketManager.emit(WebsocketManager.EVENTS.sensorData, data.toJSON());
}

/**
 * Handles incoming breath data from the ventilator
 * @param data 
 */
function handleBreathData(data: BreathData) {
    websocketManager.emit(WebsocketManager.EVENTS.breathData, data.toJSON());
}


main();