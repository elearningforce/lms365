import { EnvironmentType } from './common';
import { GlobalConfig } from './global-config';

const globalConfig = GlobalConfig.instance;

export class AuthenticationConfig {
    public static instance: AuthenticationConfig = new AuthenticationConfig();

    public get clientId(): string {
        switch (globalConfig.environmentType) {
            case EnvironmentType.CI:
            case EnvironmentType.Development:
            case EnvironmentType.QA:
                return 'd7472dc6-8048-4d3d-9ce2-b26cc6f345aa';
            case EnvironmentType.Production:
                return 'ddb8ae63-4744-4d80-8922-63d5eca36794';
            default:
                throw 'Unknown environment configuration.';
        }
    }

    public get resourceId(): string {
        switch (globalConfig.environmentType) {
            case EnvironmentType.CI:
            case EnvironmentType.Development:
            case EnvironmentType.QA:
                return '1f237c2b-c2c8-4371-a85d-ffbd50337bf8';
            case EnvironmentType.Production:
                return '751987ae-7307-451f-a4b1-e4dc2dfdd507';
            default:
                throw 'Unknown environment configuration.';
        }
    }
}