import { ChannelManager } from "./channels/channel_manager";
import { SensorDataChannel } from "./channels/sensor_data_channel";
import { SensorData } from "./data/sensor_data";
import { UDPChannelManager } from "./managers/udp_channel/udp_channel_manager";
import { CsvWriter } from "./managers/csv_manager/csv_writer";

// PARAMS
const VENTILATOR_IP = "localhost";//"192.168.0.101"
const SENSOR_DATA_PORT = 10000;

// Create all channels
const sensorDataChannel = new SensorDataChannel(new UDPChannelManager(SENSOR_DATA_PORT, VENTILATOR_IP));
// Crate the manager with the channels
const channelManager = new ChannelManager(sensorDataChannel);

// Vars
let sensorData: SensorData[] = [];

/**
 * Entry point of the program.
 *
 */
function main() {
    channelManager.init()
    channelManager.onNewSensorData(handleSensorData);
}

/**
 * Handles incoming sensor data from the ventilator
 * @param data Sensor Data
 */
function handleSensorData(data: SensorData) {
    // Do something with the sensor data
    // For example, saving it to a variable
    sensorData.push(data);
}


main();