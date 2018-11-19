export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

export interface Query {
    async?: boolean;
    contentType?: string | boolean;
    data?: any;
    ignoreProcessData?: boolean;
    jsonRequestPayload?: boolean;
    method?: HttpMethod;
    headers?: {[key: string]: string};
    url: string;
}

export interface QueryExecuter {
    execute<T>(query: Query): Promise<T>;
    execute<T>(query: Query, resolve?: (result: T) => void, reject?: (error: any) => void);
}