
interface queryHelpersParams {
    isLoading?: boolean
    isError?: boolean
    errorMessage?: string
}

export const queryHelpers = (params: queryHelpersParams[]) => {
   const isAnyLoading = params.some((query) => query.isLoading)
   const isAnyError = params.some((query) => query.isError)
   const isAnyErrorMessage = params.filter((query) => query.errorMessage !== null).map((err) => err.errorMessage).join(" ")

    return {
        isAnyLoading,
        isAnyError,
        isAnyErrorMessage
    }
}