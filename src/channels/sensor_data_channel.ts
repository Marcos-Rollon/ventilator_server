import { SensorData } from "../data/sensor_data";
import { UDPChannelManager } from "../managers/udp_channel/udp_channel_manager";

/**
 * This class controls the sensor data channel. Every operation regarding sensor data
 * should be done using this class and it's methods.
 */
export class SensorDataChannel {

    private sensorDataCallback: (data: SensorData) => void;
    private channelManager: UDPChannelManager;
    private lastSensorData: SensorData;

    constructor(channelManager: UDPChannelManager) {
        this.channelManager = channelManager;
    }

    onNewSensorData(callback: (data: SensorData) => void): void {
        this.sensorDataCallback = callback;
    }
    getLastSensorData(): SensorData {
        return this.lastSensorData;
    }

    init() {
        this.channelManager.init();
        this.channelManager.onNewMessage((msg: string) => {
            try {
                let sensorData = SensorData.fromVentilatorString(msg);
                this.lastSensorData = sensorData;
                if (this.sensorDataCallback) {
                    this.sensorDataCallback(sensorData);
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
}