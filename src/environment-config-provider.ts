import { AppType, AppInfo, EnvironmentType } from './common';
import { EnvironmentConfig, EnvironmentConfigProps } from './environment-config';
import { GlobalConfig } from './global-config';
import { Helper } from './helper';
import { QueryExecuter } from './query-executer';
import { Storage } from './storage';

const isBrowser = ('window' in this);

function getRegionPrefix(): string {
    if (!isBrowser) {
        return null;
    }

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

export abstract class EnvironmentConfigProvider {
    private readonly _environmentType: EnvironmentType;
    private _props: EnvironmentConfigProps;

    public constructor() {
        this._environmentType = GlobalConfig.instance.environmentType;
    }

    public static getCurrent(): EnvironmentConfig {
        const regionPrefix = getRegionPrefix();

        if (!regionPrefix) {
            return null;
        }

        const appInfos: { [appType: string]: AppInfo } = {};
        const globalConfig = GlobalConfig.instance;
        const apiUrl = `https:\\\\${regionPrefix}-${globalConfig.apiHost}`;
        const assetsUrl = `https:\\\\${regionPrefix}-${globalConfig.assetsHost}`;

        for (let propertyName in AppType) {
            const appType = parseInt(AppType[propertyName], 10);

            if (appType) {
                const appInfo = globalConfig.getAppInfo(appType);
                appInfos[AppType[appType]] = { clientId: appInfo.clientId, host: `${regionPrefix}-${appInfo.host}` };
            }
        }

        return new EnvironmentConfig({
            apiUrl: apiUrl,
            appInfos: appInfos,
            assetsUrl: assetsUrl
        });
    }

    private async getByContextOrUrl(url: string): Promise<EnvironmentConfig> { 
        const cachedProps = this.storage.get(this.cacheKey);
        const environmentConfig = cachedProps
            ? new EnvironmentConfig(cachedProps)
            : EnvironmentConfigProvider.getCurrent();

        if (environmentConfig) {
            return environmentConfig;
        }

        const props = await this.queryExecuter.execute<any>({ url: GlobalConfig.instance.discoveryServerUrl + url });

        this.storage.set(this.cacheKey, props);

        return new EnvironmentConfig(props);
    }

    public async getByTenantId(tenantId: string): Promise<EnvironmentConfig> {
        return this.getByContextOrUrl(Helper.Urls.getTenantInfoById(tenantId));
    }

    public async getByWebUrl(webUrl: string): Promise<EnvironmentConfig> {
        return this.getByContextOrUrl(Helper.Urls.getTenantInfoByWebUrl(webUrl));
    }

    public updateCache(props: EnvironmentConfigProps): EnvironmentConfig {
        this.storage.set(this.cacheKey, props);

        return props ? new EnvironmentConfig(props) : null;
    }

    protected abstract get queryExecuter(): QueryExecuter;

    protected get cacheKey(): string {
        return `EF.LMS365.EnvironmentConfigProvider.${this._environmentType}`;
    }

    protected abstract get storage(): Storage;
}