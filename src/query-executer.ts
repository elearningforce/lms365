export enum HttpMethod {
    GET,
    POST,
    DELETE
}

export interface Query {
    contentType?: string | boolean;
    data?: any;
    ignoreProcessData?: boolean;
    jsonRequestPayload?: boolean;
    method?: HttpMethod;
    url: string;
}

export interface QueryExecuter {
    execute<T>(query: Query): Promise<T>;
    execute<T>(query: Query, resolve?: (result: T) => void, reject?: (error: any) => void);
}