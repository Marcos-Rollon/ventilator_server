// Creates an udp server that behaves like the ventilator and sends random sensor data
const createMockSensorData = require("./mock_sensor_data").createMockSensorData;
const dgram = require("dgram");


// PARAMS
const VENTILATOR_PORT = 2222; // The port that THIS instance will be created on
const SERVER_IP = "localhost"; // The ip of the communication server
const SENSOR_DATA_PORT = 10000;



var server = dgram.createSocket('udp4');
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});
server.on('message', function (msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port)
});

// MOCKS THE SENSOR DATA

setInterval(() => {
    let data = createMockSensorData()
    //console.log(data);
    server.send(data, SENSOR_DATA_PORT, SERVER_IP)
}, 500);


server.bind(VENTILATOR_PORT, undefined, () => {
    console.log("Ventilator Mock server binded on port ", VENTILATOR_PORT);
});