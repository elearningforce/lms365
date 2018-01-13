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
    execute<TInput, TOutput>(query: Query, convert?: (input: TInput) => TOutput): Promise<TOutput>;
}