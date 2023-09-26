/**
 * This represents the primitive data that is calculated in each breath
 */
export class BreathData {
    peepPressure: number;
    peakPressure: number;
    pleateauPressure: number;
    tidalVolume: number;
    respiratoryFrequency: number;
    inspiratoryConstant: number;
    expiratoryConstant: number;
    staticCompilance: number;
    timestamp: number;
    constructor() { };

    /**
    * Decodes a string from the following format. CAN THROW.
    * peepPressure(6) peakPressure(6) plateauPressure(6) tidalVolume(4) respiratoryFrecuency(2) inspiratoryConstant(3) expiratoryConstant(3) staticCompilance(5) timestamp(10)
    * The numbers between () are the number of digits of every variable. All of then are separated with an space
    * For example
    * -000.3 0005.4 -0012.1 0052 12 1.0 2.5 00034 0000036541
    * @param encodedString Enconded string from ventilator
    */
    static fromVentilatorString(encodedString: string): BreathData {
        const parts = encodedString.split(' ');

        if (parts.length !== 9) {
            throw new Error("Invalid input format");
        }

        const breathData = new BreathData();
        try {
            breathData.peepPressure = parseFloat(parts[0]);
            breathData.peakPressure = parseFloat(parts[1]);
            breathData.pleateauPressure = parseFloat(parts[2]);
            breathData.tidalVolume = parseFloat(parts[3]);
            breathData.respiratoryFrequency = parseFloat(parts[4]);
            breathData.inspiratoryConstant = parseFloat(parts[5]);
            breathData.expiratoryConstant = parseFloat(parts[6]);
            breathData.staticCompilance = parseFloat(parts[7]);
            breathData.timestamp = parseInt(parts[8], 10);
        } catch (e) {
            console.error(e);
        }

        return breathData;
    }
}