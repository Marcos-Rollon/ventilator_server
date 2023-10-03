import { BreathData } from "../data/breath_data";
import { UDPChannelManager } from "../managers/udp_channel/udp_channel_manager";

/**
 * This class controls the breath data channel. Every operation regarding breat data
 * should be done using this class and it's methods.
 */
export class BreathDataChannel {

    private breathDataCallback: (data: BreathData) => void;
    private channelManager: UDPChannelManager;
    private lastBreathData: BreathData;

    constructor(channelManager: UDPChannelManager) {
        this.channelManager = channelManager;
    }

    onNewBreathData(callback: (data: BreathData) => void): void {
        this.breathDataCallback = callback;
    }
    getLastSensorData(): BreathData {
        return this.lastBreathData;
    }

    init() {
        this.channelManager.init();
        this.channelManager.onNewMessage((msg: string) => {
            try {
                let breathData = BreathData.fromVentilatorString(msg);
                this.lastBreathData = breathData;
                if (this.breathDataCallback) {
                    this.breathDataCallback(breathData);
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
}