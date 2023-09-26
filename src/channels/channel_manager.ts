import { SensorData } from "../data/sensor_data";
import { SensorDataChannel } from "./sensor_data_channel";

/**
 * This is an abstraction over all the channels. Every operation regarding the
 * communication with the ventilator should be done here.
 */
export class ChannelManager {
    private sensorDataChannel: SensorDataChannel;
    private sensorDataCallback: (data: SensorData) => void;

    constructor(sensorDataChannel: SensorDataChannel) {
        this.sensorDataChannel = sensorDataChannel;
    }
    init() {
        this.sensorDataChannel.init();
        this.sensorDataChannel.onNewSensorData((data) => this.sensorDataCallback(data));
    }

    onNewSensorData(callback: (data: SensorData) => void) {
        this.sensorDataCallback = callback;
    }
}