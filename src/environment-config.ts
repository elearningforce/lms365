import { AppInfo, AppType, AzureAppType, AzureAppInfo } from './common';
import { GlobalConfig } from './global-config';

export interface EnvironmentConfigProps {
    appInfos: { [appType: number]: AppInfo };
    assetsUrl: string;
    azureAppInfos: { [azureAppType: number]: AzureAppInfo };
}

export class EnvironmentConfig {
    private readonly _props: EnvironmentConfigProps;

    public constructor(props: EnvironmentConfigProps) {
        this._props = props;
    }

    public get apiUrl(): string {
        return this._props.azureAppInfos[AzureAppType.LmsApi].baseUrl;
    }

    public get assetsUrl(): string {
        return this._props.assetsUrl;
    }

    public get appInfos(): { [appType: number]: AppInfo } {
        return this._props.appInfos;
    }

    public get azureAppInfos(): { [azureAppType: number]: AzureAppInfo } {
        return this._props.azureAppInfos;
    }
}