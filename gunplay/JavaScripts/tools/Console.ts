import Globaldata from "../const/Globaldata";

export enum LogType {
    None = 0,
    Log = 1,
    Warn = 2,
    Error = 3,
    Log_Warn = 4,
    Log_Error = 5,
    Warn_Error = 6,
    Log_Warn_Error = 7,
}

export default class Console {

    public static log(...data: any[]): void {
        if (Globaldata.logLevel == LogType.None ||
            Globaldata.logLevel == LogType.Warn ||
            Globaldata.logLevel == LogType.Error ||
            Globaldata.logLevel == LogType.Warn_Error) return;
        console.log(data);
    }

    public static warn(...data: any[]): void {
        if (Globaldata.logLevel == LogType.None ||
            Globaldata.logLevel == LogType.Log ||
            Globaldata.logLevel == LogType.Error ||
            Globaldata.logLevel == LogType.Log_Error) return;
        console.warn(data);
    }

    public static error(...data: any[]): void {
        if (Globaldata.logLevel == LogType.None ||
            Globaldata.logLevel == LogType.Log ||
            Globaldata.logLevel == LogType.Warn ||
            Globaldata.logLevel == LogType.Log_Warn) return;
        console.error(data);
    }
}