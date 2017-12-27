import { AppInfo, AppType } from './common';
import { GlobalConfig } from './global-config';

function getRegionPrefix(): string {
    const globalConfig = GlobalConfig.instance;

    for (let propertyName in AppType) {
        const appType = parseInt(AppType[propertyName], 10);

        if (appType) {
            const appInfo = globalConfig.getAppInfo(appType);
            const match = new RegExp(`([a-z]*)-${appInfo.host}`).exec(window.location.host);

            if (match && (match.length == 2)) {
                return match[1];
            }
        }
    }
}

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