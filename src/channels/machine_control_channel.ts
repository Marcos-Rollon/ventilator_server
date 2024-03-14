import { UDPChannelManager } from "../managers/udp_channel/udp_channel_manager";

export class MachineControl {


    private channelManager: UDPChannelManager;

    constructor(channelManager: UDPChannelManager) {
        this.channelManager = channelManager;
    }

    init() {
        this.channelManager.init();
    }

    /**
     * Change the current Ventilation Mode
     * @param mode 
     */
    changeVentilatonMode(mode: VentilationMode) {
        // TODO:
    }

    /**
     * Changes the constants for the PID controlling the pressure in the inspiration
     * @param kp proportional constant value
     * @param ki integral constant value
     * @param kd derivative constant value
     */
    changeConstantsInspirationPressureControl(kp: number, ki: number, kd: number) {
        // TODO:
    }

    /**
     * Change the params for the Pressure Support Ventilatioan mode
     * @param params Ventilation params
     */
    changeParamsPressureSupportVentilation(params: PressureSupportVentilationParams) {
        // TODO:
    }
}

enum VentilationMode {
    PressureSupportVentilation,
    AssistControlVentilation,
}

export type PressureSupportVentilationParams = {
    plateauPressure: number; // Presión plateau (mbar). Presión peek sera medida, no se setea
    peep: number; // Presión peep (mbar)
    respiratoryFrequency: number; // Frecuencia respiratoria (resp/min)
    i: number; // I de I:E
    e: number; // E de I:E
    tidalVolumelMax: number; // Valor máximo de volumen tidal para alarmas (ml)
    tidalVolumeMin: number; // Valor mínimo de volumen tidal para alarmas (ml)
    trigger: number; // Sensibilidad en mbars para la detección de nueva respiración.
}