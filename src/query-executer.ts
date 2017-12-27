export enum HttpMethod {
    GET,
    POST,
    DELETE
}

export interface Query {
    contentType?: string | boolean;
    data?: any;
    method?: HttpMethod;
    url: string;
}

export interface QueryExecuter {
    execute<T>(query: Query): Promise<T>;
}