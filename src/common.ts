export interface AppInfo { 
    clientId: string,
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
    UsGovQa
}