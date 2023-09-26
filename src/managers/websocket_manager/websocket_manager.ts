import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Logger } from "../../utils/logger";

export class WebsocketManager {
    static EVENTS = {
        breathData: "breathData",
        sensorData: "sensorData",
    }

    private app = express();
    private server = createServer(this.app)
    private io = new Server(this.server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });
    private logger = new Logger("Websocket Manager");
    private port: number;
    private messageCallback: (event: string, msg: string) => void;

    constructor(port: number = 8000) {
        this.port = port;
        this.setup();
    }

    onWebsocketMessage(callback: (event: string, msg: string) => void): void {
        this.messageCallback = callback;
    }
    init() {
        this.logger.info(`Websocket server listening in port ${this.port}`)
        this.server.listen(this.port);
    }
    close() {
        this.logger.info(`Websocket server closed`)
        this.server.close();
    }
    get clientsCount() { return this.io.engine.clientsCount };

    emit(event: string, data: any) {
        if (Object.values(WebsocketManager.EVENTS).includes(event)) {
            this.io.sockets.emit(event, data);
        } else {
            throw new Error(`Invalid event: ${event}`);
        }
    }

    // HELPERS

    private setup() {
        this.io.on("connection", (socket) => {
            this.logger.info("New connection from socket with id: " + socket.id);

            //socket.emit("test", "this is a test msg from the server");
            this.setupSocket(socket);
        });

    }
    private setupSocket(socket: Socket) {
        // Setup the callback for every event
        Object.values(WebsocketManager.EVENTS).forEach(event => {
            socket.on(event, (data: string) => this.messageCallback(event, data));
        });
    }


}