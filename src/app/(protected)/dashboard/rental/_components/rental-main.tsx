import { RentalMainHeader } from "./rental-main-header"
import { RentalMainList } from "./rental-main-list"

interface RentalMainProps {
    token: string
}
export const RentalMain = ({token}: RentalMainProps) => {
    return (
        <>
            <RentalMainHeader />
            <RentalMainList token={token} />
        </>
    )
}