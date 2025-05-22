import { differenceInDays } from "date-fns"

export const UtilsFormatTotalDay = (start_date: Date, end_date: Date): number => {
    const totalDay: number = differenceInDays(end_date, start_date)

    return totalDay
}