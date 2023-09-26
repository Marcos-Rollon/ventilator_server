/**
 * Returns a mock string in the same format as the ventilator "sensor data", in this format:
 * pressureInput(6) pressureOutput(6) flowInput(5) flowOuput(5) valveInput(5) valveOutput(5) timestamp(10)
 * The numbers between () are the number of digits of every variable. All of then are separated with an space
 * For example
 * -000.3 0005.4 -0012 00052 000.0 095.2 0000615847
 * The range of the variables is as follows
 * pressureInput : -10 to 40
 * pressureOutput: -10 to 40
 * flowInput: -20 to 500
 * flowOutput: -20 to 500  
 * valveInput: 0 to 100
 * valveOutput: 0 to 100
 */
// Initialize an object to store the previous values
const prevSensorData = {
    pressureInput: 0,
    pressureOutput: 0,
    flowInput: 0,
    flowOutput: 0,
    valveInput: 0,
    valveOutput: 0,
    timestamp: 0,
};

function createMockSensorData() {
    // Helper function to generate a random number within a specified range
    function getRandomInRange(min, max, decimals) {
        const num = Math.random() * (max - min) + min;
        return num.toFixed(decimals);
    }

    const pressureInput = getRandomInRange(0, 40, 1);
    const pressureOutput = getRandomInRange(0, 40, 1);
    const flowInput = getRandomInRange(0, 500, 1);
    const flowOutput = getRandomInRange(0, 500, 1);
    const valveInput = getRandomInRange(0, 100, 1);
    const valveOutput = getRandomInRange(0, 100, 1);
    const timestamp = getRandomInRange(0, 999999999, 0); // 10-digit timestamp

    // Format the variables as per the specified format
    const formattedData = [
        `${pressureInput.padStart(6, '0')}`,
        `${pressureOutput.padStart(6, '0')}`,
        `${flowInput.padStart(5, '0')}`,
        `${flowOutput.padStart(5, '0')}`,
        `${valveInput.padStart(5, '0')}`,
        `${valveOutput.padStart(5, '0')}`,
        `${timestamp.padStart(10, '0')}`,
    ];

    // Join the formatted variables with spaces and return the mock sensor data
    return formattedData.join(' ');
}

module.exports = { createMockSensorData };