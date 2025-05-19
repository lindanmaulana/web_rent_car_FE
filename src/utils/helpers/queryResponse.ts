export interface pagination {
    currentPage: number
    perPage: number
    totalItems: number
    totalPages: number
    hashNextPage: boolean
    hashPrevPage: boolean
    nextPage: number | null
    prevPage: number | null
}


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
        data: T[],
        pagination?: pagination
    }
    isLoading?: boolean
    isError: boolean
    error?: Error | null
}