import dgram from "dgram";
import { Logger } from "../../utils/logger";

export class UDPChannelManager {
    port: number;
    ventilatorIP: string;
    private onMessageCallback: (msg: string) => void;
    private _socket: dgram.Socket;
    private _logger: Logger;

    constructor(port: number, ventilatorIP: string) {

        this.port = port;
        this.ventilatorIP = ventilatorIP;
        this._socket = dgram.createSocket("udp4");
        this._logger = new Logger(`UDPChannel ${port}`);
        this._setup();
    }
    // PUBLIC API

    /**
     * Initializes the channel
     */
    init() {
        this._socket.bind(this.port);
    }
    /**
     * Closes the channel
     */
    close() {
        this._socket.close();
    }
    /**
     * Sends a message over this channel
     * @param msg message to send
     */
    send(msg: string) {
        this._socket.send(msg, this.port, this.ventilatorIP, (error, msg) => {
            if (error) {
                this._logger.error("Could not send message to ventilator");
            } else {
                this._logger.debug(`Message of length ${JSON.stringify(msg)} sent`);
            }
        })
    }

    onNewMessage(callback: (msg: string) => void): void {
        this.onMessageCallback = callback;
    }


    /**
     * Setup function
     */
    _setup() {
        this._socket.on('error', (err) => {
            this._logger.error(`Channel ${this.port} error:\n${err.stack}`);
            this._socket.close();
        });

        this._socket.on('listening', () => {
            const address = this._socket.address();
            this._logger.system(`UDP Channel ${this.port} bound to IP: ${address.family} ${address.address}:${address.port}`);
        });

        this._socket.on("close", () => {
            this._logger.system(`UDP Channel ${this.port} closed`);
        });

        this._socket.on("message", (msg: string, rinfo: dgram.RemoteInfo) => {
            if (this.onMessageCallback) {
                this.onMessageCallback(msg.toString());
            }
        });
    }
}