import { AppType, AppInfo, EnvironmentType } from './common';

declare const process: { env: { NODE_ENV: string } };
declare const __webpack_hash__: string;

function getCurrentEnvironmentType(): EnvironmentType {
    const environmentTypeValue = process.env.NODE_ENV.toLowerCase();

    for (let value in EnvironmentType) {
        if (value.toLowerCase() == environmentTypeValue) {
            return EnvironmentType[value as string];
        }
    }
}

export class GlobalConfig {
    private static _instance: GlobalConfig;
    private readonly _environmentType: EnvironmentType;

    private constructor(environmentType: EnvironmentType) {
        this._environmentType = environmentType;
    }

    public getAppInfo(appType: AppType): AppInfo {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                switch (appType) {
                    case AppType.Quiz: return { clientId: '3c3bef9b-6fa0-4e4e-b56f-a463d29652fe', host: 'quiz-dev.365.systems' };
                    case AppType.Scorm: return { clientId: 'de164aa0-b48f-494b-89d7-6e171e32d639', host: 'scorm-dev.365.systems' };
                    case AppType.LearningPath: return { clientId: '6d251df7-ccb3-43c7-be67-b0a791011039', host: 'learningpath-dev.365.systems' };
                    case AppType.Assignments: return { clientId: 'de3b2532-027e-4d91-81f1-ac6e07120018', host: 'assignments-dev.365.systems' };
                    case AppType.CourseCatalog: return { clientId: 'f450d757-1f6f-4460-b0f0-77e84befc249', host: 'lms-dev.365.systems' };
                };
            case EnvironmentType.Production:
                switch (appType) {
                    case AppType.Quiz: return { clientId: 'a5b1fcda-af3d-460e-af0c-bd0a9d62118d', host: 'quiz.365.systems' };
                    case AppType.Scorm: return { clientId: '8c65bdb7-d3ab-4268-bd19-aadbf6a65394', host: 'scorm.365.systems' };
                    case AppType.LearningPath: return { clientId: '3244256b-b26e-4327-bde3-cc91be33ab9d', host: 'learningpath.365.systems' };
                    case AppType.Assignments: return { clientId: 'c16d1ce1-168c-48be-873f-823c6726328f', host: 'assignments.365.systems' };
                    case AppType.CourseCatalog: return { clientId: '50823217-d01d-4bab-ad1d-fa9554467fa1', host: 'lms.365.systems' };
                };
            case EnvironmentType.QA:
                switch (appType) {
                    case AppType.Quiz: return { clientId: '2b918912-85cb-4268-9ba5-48b5a55eb8c1', host: 'quiz-qa.365.systems' };
                    case AppType.Scorm: return { clientId: 'c03f5ec4-e95c-4993-9b87-e96b39e83b8a', host: 'scorm-qa.365.systems' };
                    case AppType.LearningPath: return { clientId: '17c8ac6b-0585-45e5-94a1-1702fafe88b3', host: 'learningpath-qa.365.systems' };
                    case AppType.Assignments: return { clientId: '3dfb32b7-69b4-4dad-810d-09f79cdf6423', host: 'assignments-qa.365.systems' };
                    case AppType.CourseCatalog: return { clientId: '12f9df19-f44d-4729-8c47-ae33bec301dd', host: 'lms-qa.365.systems' };
                };
            case EnvironmentType.CI:
                switch (appType) {
                    case AppType.Quiz: return { clientId: '1dd8ac2e-846c-423d-8235-8242408b5f9f', host: 'quiz-ci.365.systems' };
                    case AppType.Scorm: return { clientId: '94112260-eee5-4fd5-9ed9-a6a856dd7285', host: 'scorm-ci.365.systems' };
                    case AppType.LearningPath: return { clientId: 'c576effd-1bb3-4d13-b868-85427cadd152', host: 'learningpath-ci.365.systems' };
                    case AppType.Assignments: return { clientId: '93b5cf81-164e-48a1-a680-d94de11eff7c', host: 'assignments-ci.365.systems' };
                    case AppType.CourseCatalog: return { clientId: '92f52e5e-99ee-428f-9ee2-5d79f7fc6212', host: 'lms-ci.365.systems' };
                };
        }
    }

    public getAppInfoByHost(host: string): AppInfo {
        for (let property in AppType) {
            let appType = parseInt(property, 10);

            if (appType >= 0) {
                let appInfo = this.getAppInfo(appType);

                if (appInfo.host == host) return appInfo;
            }
        }
    }

    public get apiHost(): string {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                return 'api-dev.365.systems';
            case EnvironmentType.Production:
                return 'api.365.systems';
            case EnvironmentType.QA:
                return 'api-qa.365.systems';
            case EnvironmentType.CI:
                 return 'api-ci.365.systems';
        }
    }

    public get assetsHost(): string {
        switch (this._environmentType) {
            case EnvironmentType.Development:
                return 'assets-dev.365.systems';
            case EnvironmentType.Production:
                return 'assets.365.systems';
            case EnvironmentType.QA:
                return 'assets-qa.365.systems';
            case EnvironmentType.CI:
                 return 'assets-ci.365.systems';
        }
    }

    public get discoveryServerUrl(): string {
        switch(this._environmentType){
            case EnvironmentType.Development:
                return 'https://api-dev.365.systems';
            case EnvironmentType.Production:
                return 'https://api.365.systems';
            case EnvironmentType.QA:
                return 'https://api-qa.365.systems';
            case EnvironmentType.CI:
                return 'https://api-ci.365.systems';
        }
    }

    public get environmentType() : EnvironmentType {
        return this._environmentType;
    }

    public get versionHash(): string {
        return __webpack_hash__;
    }

    public static get instance() {
        return GlobalConfig._instance = GlobalConfig._instance || new GlobalConfig(getCurrentEnvironmentType());
    }
}