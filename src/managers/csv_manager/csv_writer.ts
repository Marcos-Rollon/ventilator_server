import { createObjectCsvWriter } from "csv-writer";
import csvParser from 'csv-parser';
import { SensorData } from "../../data/sensor_data";
import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';

export class CsvWriter {
    private static sensorDataHeaders = [
        { id: "pressureInput", title: "Pressure Input" },
        { id: "pressureOutput", title: "Pressure Output" },
        { id: "flowInput", title: "Flow Input" },
        { id: "flowOutput", title: "Flow Output" },
        { id: "valveIn", title: "Valve Input" },
        { id: "valveOut", title: "Valve Output" },
        { id: "timestamp", title: "Timestamp" },
    ];
    private constructor() { };

    /**
     * Write sensor data to a CSV file.
     *
     * @param {SensorData[]} data - array of sensor data to be written to the CSV file
     * @return {Promise<boolean>} a promise that resolves to a boolean indicating if the writing was successful
     */
    static writeSensorData(data: SensorData[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const currentDate = format(new Date(), 'yyyy_MM_dd_HH_mm');
            const rootPath = process.cwd();
            const logsFolderPath = path.join(rootPath, 'csv_logs');
            const filePath = path.join(logsFolderPath, `${currentDate}_sensorData.csv`);

            // Check if the logs folder exists, create it if not
            if (!fs.existsSync(logsFolderPath)) {
                fs.mkdirSync(logsFolderPath, { recursive: true });
            }
            // Create a CSV writer with the specified headers
            const csvWriter = createObjectCsvWriter({
                path: filePath,
                header: CsvWriter.sensorDataHeaders,
            });

            // Write the data to the CSV file
            csvWriter
                .writeRecords(data)
                .then(() => {
                    // Writing was successful
                    resolve(true);
                })
                .catch((error) => {
                    // Writing failed
                    console.error("Error writing CSV:", error);
                    resolve(false);
                });
        });
    }

    /**
     * Read sensor data from a CSV file.
     *
     * @param {string} filePath - the path to the CSV file
     * @return {Promise<SensorData[]>} a promise that resolves with an array of SensorData objects
     */
    static readSensorDataFromCsv(filePath: string): Promise<SensorData[]> {
        return new Promise((resolve, reject) => {
            const sensorDataList: SensorData[] = [];

            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                reject(new Error("CSV file does not exist"));
                return;
            }

            // Use csv-parser to read and parse the CSV file
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row) => {
                    // Map the CSV row to a SensorData object
                    const sensorData = new SensorData();
                    sensorData.pressureInput = parseFloat(row['Pressure Input']);
                    sensorData.pressureOutput = parseFloat(row['Pressure Output']);
                    sensorData.flowInput = parseFloat(row['Flow Input']);
                    sensorData.flowOutput = parseFloat(row['Flow Output']);
                    sensorData.valveInput = parseFloat(row['Valve Input']);
                    sensorData.valveOutput = parseFloat(row['Valve Output']);
                    sensorData.timestamp = parseInt(row['Time'], 10);

                    sensorDataList.push(sensorData);
                })
                .on('end', () => {
                    resolve(sensorDataList);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}