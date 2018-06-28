import { AppInfo, AppType } from './common';
import { GlobalConfig } from './global-config';

export interface EnvironmentConfigProps {
    apiUrl: string;
    appInfos: { [appType: string]: AppInfo };
    assetsUrl: any;
}

export class EnvironmentConfig {
    private readonly _props: EnvironmentConfigProps;

    public constructor(props: EnvironmentConfigProps) {
        this._props = props;
    }

    public getAppInfo(appType: AppType): AppInfo {
        return this._props.appInfos[AppType[appType]];
    }

    public get apiUrl(): string {
        return this._props.apiUrl;
    }

    public get assetsUrl(): string {
        return this._props.assetsUrl;
    }
}