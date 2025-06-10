"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSnap } from "@/hooks/midtrans/useSnap";
import { useRentalGetOne } from "@/hooks/rental/useRentalGetOne"
import { APIURLIMAGE } from "@/publicConfig";
import { TypePaymentCreateSchema } from "@/schemas/payments";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency";
import { UtilsFormatDate } from "@/utils/helpers/formatDate";
import { UtilsPayment } from "@/utils/services/payment";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useState } from "react";
import { GiKeyCard } from "react-icons/gi";


const PageTransaction = () => {
    const params = useParams<{id: string}>()
    const session = useSession()
    const queryRental = useRentalGetOne(params)
    const {snapEmbed} = useSnap()

    const [snapShow, setSnapShow] = useState<boolean>(false)

    const mutation = useMutation({
        mutationKey: ["createPayment"],
        mutationFn: (values: TypePaymentCreateSchema) => UtilsPayment.create({token: session.data?.user.token}, values)
    })


    if(queryRental.isLoading || session.status === "loading") return <p>Loading...</p>
    if(queryRental.isError) return <p>Error...</p>

    console.log({queryRental: queryRental.data})
    console.log({params})

    const handlePayment = (values: TypePaymentCreateSchema) => {
        setSnapShow(true)

        mutation.mutate(values, {
            onSuccess: (data) => {
                console.log({data})
                snapEmbed(data.data.token, "snap-container", () => "")
            },

            onError: (err) => {
                console.log(UtilsErrorConsumeAPI(err))
            }
        })
    }

    const dataRental = queryRental.data.data

    
    return (
        <div className="w-full flex items-center justify-center py-5">
            <div className="w-2xl space-y-4">
                {!snapShow && (
                    <>
                        <div className="flex flex-col items-center justify-center">
                    <GiKeyCard className="text-6xl text-primary-blue" />
                    <h5 className="text-4xl font-medium text-primary-blue">Transaction</h5>
                </div>

                <div className="px-4 pt-4 pb-4 rounded-lg shadow shadow-primary/20">
                    <figure>
                        <Image src={`${APIURLIMAGE}${dataRental.car.thumbnail}`} alt={dataRental.car.model} width={200} height={100} className="w-full h-full" />
                    </figure>
                    <h5 className="font-semibold text-primary/60">{dataRental.car.brand.name} {dataRental.car.model}</h5>
                </div>

                <div className="px-4 pt-4 pb-10 rounded-lg shadow shadow-primary/20 space-y-3">
                    <h5 className="text-primary/80 text-xl font-semibold">Informasi Customer</h5>
                    <div className="space-y-1">
                        <Input type="text" defaultValue={session.data?.user.email} className="text-primary/50" readOnly />
                        <p className="text-primary/30 text-xs ml-2">Pastikan email yang tertera benar</p>
                    </div>
                </div>

                <div className="px-4 pt-4 pb-10 rounded-lg shadow shadow-primary/20 space-y-3">
                    <h5 className="text-primary/80 text-xl font-semibold">Informasi Rental</h5>
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <h6 className="text-sm text-primary/50">Total Day</h6>
                            <Input type="text" defaultValue={dataRental.total_day} className="text-primary/50" readOnly />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-primary/50">Status</h6>
                            <Input type="text" defaultValue={dataRental.status} className="text-primary/50" readOnly />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-primary/50">Start Rental</h6>
                            <Input type="text" defaultValue={UtilsFormatDate(dataRental.start_date)} className="text-primary/50" readOnly />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-primary/50">End Rental</h6>
                            <Input type="text" defaultValue={UtilsFormatDate(dataRental.end_date)} className="text-primary/50" readOnly />
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-4 pb-10 rounded-lg shadow shadow-primary/20 space-y-3">
                    <h5 className="text-primary/80 text-xl font-semibold">Rental</h5>
                    <ul>
                        <li className="border-b py-4">
                            <div className="flex items-center justify-between *:text-primary/60">
                                <h6>{dataRental.car.brand.name} | {dataRental.car.model}</h6>
                                <p>{UtilsFormatCurrency(dataRental.total_price)}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <Button onClick={() => handlePayment({rental_id: dataRental.id, amount: dataRental.total_price, gateway: "MIDTRANS"})} className="w-full py-6 bg-primary-blue cursor-pointer hover:bg-primary-blue/80">Bayar Sekarang</Button>
                    </>
                )}

                <div id="snap-container" className="w-1/2" />
            </div>
        </div>
    )
}

export default PageTransaction