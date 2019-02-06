import { EnvironmentType } from './common';

declare const NODE_ENV: string;
declare const __webpack_hash__: string;

const isBrowser = ('window' in this);
let environmentType = (window ? window['EF.LMS365.GlobalConfig.environmentType'] : null) as number;

export class GlobalConfig {
    public readonly environmentType: EnvironmentType;

    public static instance: GlobalConfig = new GlobalConfig(environmentType);

    private constructor(environmentType: EnvironmentType) {
        this.environmentType = environmentType;
    }

    public get apiAppId(): string {
        switch (this.environmentType) {
            case EnvironmentType.Development:
                return 'adad902c-44bc-4fca-825f-8b4fd3e7d3dc';
            case EnvironmentType.CI:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return '1f237c2b-c2c8-4371-a85d-ffbd50337bf8';
            case EnvironmentType.Production:
                return '751987ae-7307-451f-a4b1-e4dc2dfdd507';
            case EnvironmentType.UsGovQa:
                return '8dfbb022-7763-49a0-94e1-0c3594dc0083';
            default:
                throw `'${EnvironmentType[this.environmentType]}' is unsupported yet.`;
        }
    }

    public get clientAppId(): string {
        switch (this.environmentType) {
            case EnvironmentType.Development:
                return '1e6c65b9-24f5-470a-b5cb-6e05a608d19e';
            case EnvironmentType.QA:
            case EnvironmentType.CI:
            case EnvironmentType.Hotfix:
                return 'd7472dc6-8048-4d3d-9ce2-b26cc6f345aa';
            case EnvironmentType.Production:
                return 'ddb8ae63-4744-4d80-8922-63d5eca36794';
            case EnvironmentType.UsGovQa:
                return '7263c84c-d168-4506-82ed-6b8b01233e19';
            default:
                throw `'${EnvironmentType[this.environmentType]}' is unsupported yet.`;
        }
    }

    public get discoveryServerUrl(): string {
        switch (this.environmentType) {
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

    public get loginEndPoint() : string {
        switch(this.environmentType) {
            case EnvironmentType.UsGovProduction:
            case EnvironmentType.UsGovQa:
                return 'https://login.microsoftonline.us'
            default:
                return 'https://login.microsoftonline.com'
        }
    }

    /** To support compatibily with previous versions. Currently is used in Teams. */
    public get assetsHost(): string {
        switch (this.environmentType) {
            case EnvironmentType.Development:
                return 'assets-dev.365.systems';
            case EnvironmentType.Production:
                return 'assets.365.systems';
            case EnvironmentType.QA:
                return 'assets-qa.365.systems';
            case EnvironmentType.CI:
                 return 'assets-ci.365.systems';
            case EnvironmentType.UsGovProduction:
                 return 'assets.usgcc365.systems';
            case EnvironmentType.UsGovQa:
                 return 'assets-qa.usgcc365.systems';
            case EnvironmentType.Hotfix:
                 return 'assets-hotfix.365.systems';
        }
    }

    public get versionHash(): string {
        return __webpack_hash__;
    }
}