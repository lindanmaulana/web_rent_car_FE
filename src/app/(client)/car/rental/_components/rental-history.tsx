'use client'

import { useRentalGetAll } from "@/hooks/rental"
import { APIURLIMAGE } from "@/publicConfig";
import Image from "next/image";

interface RentalHistoryProps {
    token: string
}

export const RentalHistory = ({token}: RentalHistoryProps) => {
    const queryRental = useRentalGetAll({token});

    if(queryRental.isLoading) return <p>Loading...</p>

    if(queryRental.isError) return <p>Error...</p>

    console.log({queryRental: queryRental.data})

    const rentalData = queryRental.data.data
    return (
        <div className="">
                {rentalData.map(rental => (
                    <div key={rental.id}>
                        <figure>
                            <Image src={`${APIURLIMAGE}${rental.car.thumbnail}`} alt="hello" width={100} height={100} />
                        </figure>
                    </div>
                ))}
        </div>
    )
}