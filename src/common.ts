export enum AzureAppType
{
    GraphApi = 1,
    Lms,
    LmsApi,
    SharePointApi
}

export interface AppInfo {
    baseUrl: string;
    clientId: string;
    host: string;
}

export enum AppType {
    Scorm = 1,
    Assignments = 3,
    CourseCatalog = 2,
    LearningPath = 4,
    Quiz = 5
}

export enum EnvironmentType {
    Development,
    Production,
    QA,
    CI,
    UsGovProduction,
    UsGovQa,
    Hotfix
}