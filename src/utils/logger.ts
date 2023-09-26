export class Logger {
    /**
     * Global parameters
     */
    static _verbose = true;
    static _muteAll = false;
    static _showErrors = true;
    static _showWarnings = true;
    static _showInfo = true;
    static _showDebug = false;

    // Static instance of class to use when you don't want to instanciate
    static _instance = new Logger("Root Logger");

    _callerName: String;

    /**
     * 
     * @param {String} callerName every log will be prefixed with [callerName]
     */
    constructor(callerName: String) {
        this._callerName = callerName;
    }

    /**
     * Logs as a system message. The only way to mute this is setting the Logger to mute
     * @param {any} msg 
     */
    system(msg: any) {
        if (!Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs as a system message using the root logger. The only way to mute this is setting the Logger to mute
     * @param {any} msg 
     */
    static system(msg: any) {
        this._instance.system(msg);
    }
    /**
     * Logs as an info message. Mute this with info = false in setLogState
     * @param {any} msg 
     */
    info(msg: any) {
        if (Logger._showInfo && !Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs as an info message using the root logger. Mute this with info = false in setLogState
     * @param {any} msg 
     */
    static info(msg: any) {
        this._instance.info(msg);
    }
    /**
     * Logs as a verbose message. This means additional information that may not be always needed.
     * Mute this with verbose = false in setLogState
     * @param {any} msg 
     */
    verbose(msg: any) {
        if (Logger._verbose && !Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs as a verbose message using the root logger. This means additional information that may not be always needed.
     * Mute this with verbose = false in setLogState
     * @param {any} msg 
     */
    static verbose(msg: any) {
        this._instance.verbose(msg);
    }
    /**
     * Logs as an error message. Mute this with error = false in setLogState
     * @param {any} msg 
     */
    error(msg: any) {
        if (Logger._showErrors && !Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs as an error message using the root logger. Mute this with error = false in setLogState
     * @param {any} msg 
     */
    static error(msg: any) {
        this._instance.error(msg);
    }
    /**
     * Logs as a warning message. Mute this with warning = false in setLogState
     * @param {any} msg 
     */
    warning(msg: any) {
        if (Logger._showWarnings && !Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs as a warning message using the root logger. Mute this with warning = false in setLogState
     * @param {any} msg 
     */
    static warning(msg: any) {
        this._instance.warning(msg);
    }

    /**
     * Logs a debug message. Mute this with debug = false.
     * @param {any} msg 
     */
    debug(msg: any) {
        if (Logger._showDebug && !Logger._muteAll)
            console.log(`${`[${this._callerName}]`} ${msg}`);
    }
    /**
     * Logs a debug message using the root logger. Mute this with debug = false.
     * @param {any} msg 
     */
    static debug(msg: any) {
        this._instance.debug(msg);
    }

    /**
     * Set the state of the logs. If true no logs are shown. This is GLOBAL.
     * @param {boolean} mute 
     */
    static mute(mute: boolean) {
        Logger._muteAll = mute;
    }

    /**
     * Set the show state of the different kinds of logging types. These are GLOBAL.
     * @param {Object} args
     * @param {boolean} args.verbose 
     * @param {boolean} args.warning
     * @param {boolean} args.error
     * @param {boolean} args.info  
     */
    static setLogState({ verbose = true, warning = true, error = true, info = true, debug = false }) {
        Logger._verbose = verbose;
        Logger._showWarnings = warning;
        Logger._showErrors = error;
        Logger._showInfo = info;
        Logger._showDebug = debug;
    }

}
