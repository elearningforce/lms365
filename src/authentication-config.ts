import { EnvironmentType } from './common';

export class AuthenticationConfig {
    private readonly _environmentType: EnvironmentType;

    public constructor(environmentType: EnvironmentType) {
        this._environmentType = environmentType;
    }

    public get clientAppId(): string {
        switch (this._environmentType) {
            case EnvironmentType.CI:
            case EnvironmentType.Development:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return 'd7472dc6-8048-4d3d-9ce2-b26cc6f345aa';
            case EnvironmentType.Production:
                return 'ddb8ae63-4744-4d80-8922-63d5eca36794';
            case EnvironmentType.UsGovQa:
                return '7263c84c-d168-4506-82ed-6b8b01233e19';
            default:
                throw `'${EnvironmentType[this._environmentType]}' is unsupported yet.`;
        }
    }

    public get apiAppId(): string {
        switch (this._environmentType) {
            case EnvironmentType.CI:
            case EnvironmentType.Development:
            case EnvironmentType.QA:
            case EnvironmentType.Hotfix:
                return '1f237c2b-c2c8-4371-a85d-ffbd50337bf8';
            case EnvironmentType.Production:
                return '751987ae-7307-451f-a4b1-e4dc2dfdd507';
            case EnvironmentType.UsGovQa:
                return '8dfbb022-7763-49a0-94e1-0c3594dc0083';
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