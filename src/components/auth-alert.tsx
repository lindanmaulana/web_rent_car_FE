import { AlertTriangle, CheckCircleIcon } from "lucide-react"

interface AuthAlertProps {
    message: string
    type: "error" | "success"
}
export const AuthAlert = ({message, type}: AuthAlertProps) => {
    if(!message) return null
    return (
        <div className={`${type === "success" ? "bg-emerald-500/15 text-emerald-500" : "bg-destructive/15 text-destructive"} p-3 rounded-md flex items-center gap-x-2 text-sm`}>
            {type === "success" ? (
                <CheckCircleIcon className="w-4 h-4" />
            ) : (
                <AlertTriangle className="w-4 h-4" />
            )}
            <p>{message}</p>
        </div>
    )
}