import { format } from "date-fns"

export const UtilsFormatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd")
}