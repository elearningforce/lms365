declare const __webpack_hash__: string;

export class GlobalConfig {
    public static readonly instance: GlobalConfig = new GlobalConfig();

    public get discoveryServerUrl(): string {
        return window['EF.LMS365.GlobalConfig.discoveryServerUrl'];
    }

    public get versionHash(): string {
        return __webpack_hash__;
    }
}