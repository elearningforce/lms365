import { AppInfo, AzureAppType, AzureAppInfo } from './common';

function  getRegionPrefix(apiUrl: string): string {
    const match = new RegExp(`https://([a-z]*)-.*`).exec(apiUrl);

    if (match && (match.length == 2)) {
        return match[1];
    }
}

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

    public getAssetHash(assetName: string) : string {
        const regionHashes = window[`ef.lms365.hashes.${this.regionPrefix}`]

        if(regionHashes) {
            return regionHashes[assetName]
        }

        return null;
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

    public get regionPrefix(): string {
        return getRegionPrefix(this.apiUrl);
    }
}