"use client"

interface ErrorUiProps {
    message?: string
}
export const ErrorUi = ({message}: ErrorUiProps) => {
    return (
        <div>
            {message}
        </div>
    )
}