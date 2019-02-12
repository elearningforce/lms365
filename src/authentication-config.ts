import { EnvironmentType } from './common';

export class AuthenticationConfig {
    private readonly _environmentType: EnvironmentType;

    public constructor(environmentType: EnvironmentType) {
        this._environmentType = environmentType;
    }

    public get clientAppId(): string {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                return '1e6c65b9-24f5-470a-b5cb-6e05a608d19e';
            case EnvironmentType.CI:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return 'd7472dc6-8048-4d3d-9ce2-b26cc6f345aa';
            case EnvironmentType.Production:
                return 'ddb8ae63-4744-4d80-8922-63d5eca36794';
            case EnvironmentType.UsGovQa:
                return '58a22ed1-2720-4a11-9883-b26278942032';
            case EnvironmentType.UsGovProduction:
                return 'febd590c-4799-4123-8902-c80313b2cfcd';
            default:
                throw `'${EnvironmentType[this._environmentType]}' is unsupported yet.`;
        }
    }

    public get apiAppId(): string {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                return 'adad902c-44bc-4fca-825f-8b4fd3e7d3dc';
            case EnvironmentType.CI:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return '1f237c2b-c2c8-4371-a85d-ffbd50337bf8';
            case EnvironmentType.Production:
                return '751987ae-7307-451f-a4b1-e4dc2dfdd507';
            case EnvironmentType.UsGovQa:
                return 'faf362cf-1051-447a-98c9-aa05a230ff62';
            case EnvironmentType.UsGovProduction:
                return '164f64d9-1431-4bb2-9a3a-734f415ff82f';
            default:
                throw `'${EnvironmentType[this._environmentType]}' is unsupported yet.`;
        }
    }

    public get provisioningAppId(): string {
        switch (this._environmentType) {
            case EnvironmentType.CI:
            case EnvironmentType.Development:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return 'd7472dc6-8048-4d3d-9ce2-b26cc6f345aa';
            default:
                throw `'${EnvironmentType[this._environmentType]}' is unsupported yet.`;
        }
    }
}