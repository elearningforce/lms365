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
    url: string;
}

export interface QueryExecuter {
    execute<T>(query: Query): Promise<T>;
    execute<TInput, TOutput>(query: Query, convert?: (input: TInput) => TOutput): Promise<TOutput>;
    executeSync<TOutput>(query: Query, converter?: (input: string) => TOutput): TOutput;
}