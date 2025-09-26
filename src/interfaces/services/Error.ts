export interface IErrorResponse {
    detail: string
}

export interface IBlobErrorResponse extends IErrorResponse {
    text: () => Promise<string>
}