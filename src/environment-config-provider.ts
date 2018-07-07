import { AppType, AppInfo, AzureAppType, EnvironmentType } from './common';
import { EnvironmentConfig, EnvironmentConfigProps } from './environment-config';
import { GlobalConfig } from './global-config';
import { Helper } from './helper';
import { QueryExecuter } from './query-executer';
import { Storage } from './storage';

export abstract class EnvironmentConfigProvider {
    private readonly _environmentType: EnvironmentType;
    private _props: EnvironmentConfigProps;

    public constructor() {
        this._environmentType = GlobalConfig.instance.environmentType;
    }

    private static correctProps(props: EnvironmentConfigProps) {
        const appInfos = props.appInfos;
        const azureAppInfos = props.azureAppInfos;

        props.appInfos = {};
        for (const key in appInfos) {
            props.appInfos[AppType[key]] = appInfos[key];
        }

        props.azureAppInfos = {};
        for (const key in azureAppInfos) {
            props.azureAppInfos[AzureAppType[key]] = azureAppInfos[key];
        }
    }

    private async getByContextOrUrl(url: string): Promise<EnvironmentConfig> { 
        const cachedProps = this.storage.get(this.cacheKey);
        const environmentConfig = cachedProps && new EnvironmentConfig(cachedProps);

        if (environmentConfig) {
            return environmentConfig;
        }

        const props = await this.queryExecuter.execute<any>({ url: GlobalConfig.instance.discoveryServerUrl + url }) as EnvironmentConfigProps;

        EnvironmentConfigProvider.correctProps(props);
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
        return `EF.LMS365.EnvironmentConfig.${this._environmentType}`;
    }

    protected abstract get storage(): Storage;
}