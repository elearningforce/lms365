import { AppInfo, AppType } from './common';
import { EnvironmentConfig } from './environment-config';
import { EnvironmentConfigProvider } from './environment-config-provider';
import { GlobalConfig } from './global-config';

export class Helper {
    public static Urls = {
        getTenantInfo: (tenantId: string) => `/discovery/tenants/byid?id=${encodeURIComponent(tenantId)}`,
        getTenantInfoByWebUrl: (webUrl: string) => `/discovery/tenants/byurl?url=${encodeURIComponent(webUrl)}`
   };
}