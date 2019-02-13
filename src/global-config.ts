import { AuthenticationConfig } from './authentication-config';
import { EnvironmentType } from './common';

declare const EF_LMS365_ENVIRONMENT: string;
declare const __webpack_hash__: string;

function getCurrentEnvironmentType(): EnvironmentType {
    const environmentTypeValue = EF_LMS365_ENVIRONMENT.toLowerCase();

    for (let value in EnvironmentType) {
        if (value.toLowerCase() == environmentTypeValue) {
            return EnvironmentType[value as string];
        }
    }
}

export class GlobalConfig {
    private static _instance: GlobalConfig;

    private readonly _authentication: AuthenticationConfig
    private readonly _environmentType: EnvironmentType;

    private constructor(environmentType: EnvironmentType) {
        this._authentication = new AuthenticationConfig(environmentType);
        this._environmentType = environmentType;
    }

    public get authentication(): AuthenticationConfig {
        return this._authentication;
    }

    public get discoveryServerUrl(): string {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                return 'https://api-dev.365.systems';
            case EnvironmentType.Production:
                return 'https://api.365.systems';
            case EnvironmentType.QA:
                return 'https://api-qa.365.systems';
            case EnvironmentType.CI:
                return 'https://api-ci.365.systems';
            case EnvironmentType.UsGovProduction:
                return 'https://api.usgcc365.systems';
            case EnvironmentType.UsGovQa:
                return 'https://api-qa.usgcc365.systems';
            case EnvironmentType.Hotfix:
                return 'https://api-hotfix.365.systems';
        }
    }

    public get environmentType() : EnvironmentType {
        return this._environmentType;
    }

    public get versionHash(): string {
        return __webpack_hash__;
    }

    public static get instance() {
        return GlobalConfig._instance = GlobalConfig._instance || new GlobalConfig(getCurrentEnvironmentType());
    }
}