import { AxiosError } from "axios"

export interface IBasicResponse<T> {
    message: string
    data: T
}

interface BasicErrorResponse<T = string> {
    detail: T
}

export type TBasicErrorResponse<T = string> = AxiosError<BasicErrorResponse<T>>
