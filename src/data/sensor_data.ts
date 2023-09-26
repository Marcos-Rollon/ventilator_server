
export class SensorData {

    pressureInput: number;
    pressureOutput: number;
    flowInput: number;
    flowOutput: number;
    valveInput: number;
    valveOutput: number;
    timestamp: number;

    constructor() { };

    /**
     * Decodes a string from the following format. CAN THROW.
     * pressureInput(6) pressureOutput(6) flowInput(5) flowOuput(5) valveInput(5) valveOutput(5) timestamp(10)
     * The numbers between () are the number of digits of every variable. All of then are separated with an space
     * For example
     * -000.3 0005.4 -0012 00052 000.0 095.2 0000615847
     * @param encodedString Enconded string from ventilator
     */
    static fromVentilatorString(encodedString: string): SensorData {
        const parts = encodedString.split(' ');

        if (parts.length !== 7) {
            throw new Error("Invalid input format");
        }

        const sensorData = new SensorData();
        try {
            sensorData.pressureInput = parseFloat(parts[0]);
            sensorData.pressureOutput = parseFloat(parts[1]);
            sensorData.flowInput = parseFloat(parts[2]);
            sensorData.flowOutput = parseFloat(parts[3]);
            sensorData.valveInput = parseFloat(parts[4]);
            sensorData.valveOutput = parseFloat(parts[5]);
            sensorData.timestamp = parseInt(parts[6], 10);
        } catch (e) {
            console.error(e);
        }
        return sensorData;
    }

    /**
   * Serializes the SensorData instance to a JSON object.
   */
    toJSON(): Record<string, any> {
        return {
            pressureInput: this.pressureInput,
            pressureOutput: this.pressureOutput,
            flowInput: this.flowInput,
            flowOutput: this.flowOutput,
            valveInput: this.valveInput,
            valveOutput: this.valveOutput,
            timestamp: this.timestamp,
        };
    }

    /**
     * Deserializes a JSON object into a SensorData instance.
     * @param json JSON object to deserialize from.
     */
    static fromJSON(json: Record<string, any>): SensorData {
        const sensorData = new SensorData();
        sensorData.pressureInput = json.pressureInput;
        sensorData.pressureOutput = json.pressureOutput;
        sensorData.flowInput = json.flowInput;
        sensorData.flowOutput = json.flowOutput;
        sensorData.valveInput = json.valveInput;
        sensorData.valveOutput = json.valveOutput;
        sensorData.timestamp = json.timestamp;

        return sensorData;
    }
}