import { SensorData } from '../../src/data/sensor_data'; // Assuming your class is in a separate file

describe('SensorData', () => {
    it('should correctly serialize to JSON', () => {
        const sensorData = new SensorData();
        sensorData.pressureInput = -0.3;
        sensorData.pressureOutput = 5.4;
        sensorData.flowInput = -12;
        sensorData.flowOutput = 52;
        sensorData.valveInput = 0;
        sensorData.valveOutput = 95.2;
        sensorData.timestamp = 615847;

        const expectedJSON = {
            pressureInput: -0.3,
            pressureOutput: 5.4,
            flowInput: -12,
            flowOutput: 52,
            valveInput: 0,
            valveOutput: 95.2,
            timestamp: 615847,
        };

        expect(sensorData.toJSON()).toEqual(expectedJSON);
    });

    it('should correctly deserialize from JSON', () => {
        const jsonSensorData = {
            pressureInput: -0.3,
            pressureOutput: 5.4,
            flowInput: -12,
            flowOutput: 52,
            valveInput: 0,
            valveOutput: 95.2,
            timestamp: 615847,
        };

        const deserializedSensorData = SensorData.fromJSON(jsonSensorData);

        expect(deserializedSensorData).toBeInstanceOf(SensorData);
        expect(deserializedSensorData).toEqual({
            pressureInput: -0.3,
            pressureOutput: 5.4,
            flowInput: -12,
            flowOutput: 52,
            valveInput: 0,
            valveOutput: 95.2,
            timestamp: 615847,
        });
    });
});

describe('SensorData', () => {
    describe('fromVentilatorString', () => {
        it('should parse a valid ventilator string correctly', () => {
            const encodedString = '-000.3 0005.4 -0012 00052 000.0 095.2 0000615847';

            const result = SensorData.fromVentilatorString(encodedString);

            // Assert that the properties are correctly parsed
            expect(result.pressureInput).toEqual(-0.3);
            expect(result.pressureOutput).toEqual(5.4);
            expect(result.flowInput).toEqual(-12);
            expect(result.flowOutput).toEqual(52);
            expect(result.valveInput).toEqual(0);
            expect(result.valveOutput).toEqual(95.2);
            expect(result.timestamp).toEqual(615847);
        });

        it('should throw an error for an invalid input format', () => {
            const invalidString = 'InvalidFormat'; // Not following the specified format

            // Wrap the method call in a function to assert the error
            const parseInvalidString = () => {
                SensorData.fromVentilatorString(invalidString);
            };

            // Assert that an error is thrown
            expect(parseInvalidString).toThrow(Error('Invalid input format'));
        });
    });
});