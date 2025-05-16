export interface queryResponse<T> {
    data: {
        data: T
    }
    isLoading?: boolean
    isError: boolean
    error?: Error | null
}

export interface queryResponses<T> {
    data: {
        data: T[]
    }
    isLoading?: boolean
    isError: boolean
    error?: Error | null
}