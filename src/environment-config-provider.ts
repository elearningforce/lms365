import { EnvironmentType } from './common';
import { EnvironmentConfig, EnvironmentConfigProps } from './environment-config';
import { GlobalConfig } from './global-config';
import { Helper } from './helper';
import { QueryExecuter } from './query-executer';
import { Storage } from './storage';

export abstract class EnvironmentConfigProvider {
    private readonly _environmentType: EnvironmentType;
    private _props: EnvironmentConfigProps;

    protected constructor() {
        this._environmentType = GlobalConfig.instance.environmentType;
    }

    public async getByTenantId(tenantId: string): Promise<EnvironmentConfig> {
        const cachedProps = this.storage.get(this.cacheKey);
        const environmentConfig = cachedProps ? new EnvironmentConfig(cachedProps) : null;

        if (environmentConfig != null) {
            return new Promise<EnvironmentConfig>(
                (resolve: (input: EnvironmentConfig) => void, reject: (reason?: any) => void) => {
                    resolve(environmentConfig);
                }
            );
        }

        return new Promise<EnvironmentConfig>(
            (resolve: (input: EnvironmentConfig) => void, reject: (reason?: any) => void) => {
                this.queryExecuter.execute<any>({ url: GlobalConfig.instance.discoveryServerUrl + Helper.Urls.getTenantInfo(tenantId) })
                    .then(props => {
                        const environmentConfig = new EnvironmentConfig(props);

                        this.storage.set(this.cacheKey, props);

                        resolve(environmentConfig);
                    })
                    .catch(reject);
            });
    }

    protected abstract get queryExecuter(): QueryExecuter;

    protected get cacheKey(): string {
        return `EF.LMS365.EnvironmentConfigProvider.${this._environmentType}`;
    }

    protected abstract get storage(): Storage;
}