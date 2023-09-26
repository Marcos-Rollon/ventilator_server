import { SensorData } from "../../src/data/sensor_data";
import { CsvWriter } from "../../src/managers/csv_manager/csv_writer";

function generateMockSensorData(amount: number): SensorData[] {
    let values: SensorData[] = [];
    for (let i = 0; i < amount; i++) {
        const sensorData = new SensorData();
        sensorData.pressureInput = Math.random() * 10;
        sensorData.pressureOutput = Math.random() * 10;
        sensorData.flowInput = Math.random() * 10;
        sensorData.flowOutput = Math.random() * 10;
        sensorData.valveInput = Math.random() * 10;
        sensorData.valveOutput = Math.random() * 10;
        sensorData.timestamp = Date.now();
        values.push(sensorData)
    }

    return values;
}


describe('CsvWriter', () => {

    it('should write SensorData to CSV', async () => {
        const sensorData = generateMockSensorData(200);

        // Call the writeSensorData method
        const success = await CsvWriter.writeSensorData(sensorData);

        // Assert that the success value is true
        expect(success).toBe(true);
    });

    it('should read from csv', async () => {
        const sensorData = await CsvWriter.readSensorDataFromCsv("/Users/marcos/Documents/respirador/com_server/csv_logs/2023_09_12_13_56_sensorData.csv")
        expect(sensorData).toBeTruthy();
    });

});
