import { EnvironmentType } from './common';
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

    public clear() {
        this.storage.set(this.cacheKey, null);
    }

    private async getByUrl(url: string): Promise<EnvironmentConfig> { 
        const cachedProps = this.storage.get(this.cacheKey);
        const environmentConfig = (cachedProps ? new EnvironmentConfig(cachedProps) : null);

        if (EnvironmentConfig.current) {
            return EnvironmentConfig.current;
        }

        const props = await this.queryExecuter.execute<any>({ url: GlobalConfig.instance.discoveryServerUrl + url });

        this.storage.set(this.cacheKey, props);

        return new EnvironmentConfig(props);
    }

    public async getById(tenantId: string): Promise<EnvironmentConfig> {
        return this.getByUrl(Helper.Urls.getTenantInfoById(tenantId));
    }

    public async getByWebUrl(webUrl: string): Promise<EnvironmentConfig> {
        return this.getByUrl(Helper.Urls.getTenantInfoByWebUrl(webUrl));
    }

    protected abstract get queryExecuter(): QueryExecuter;

    protected get cacheKey(): string {
        return `EF.LMS365.EnvironmentConfigProvider.${this._environmentType}`;
    }

    protected abstract get storage(): Storage;
}