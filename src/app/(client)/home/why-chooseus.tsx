import { GoClock, GoShieldCheck, GoStar } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { IconType } from "react-icons/lib";

export const HomeWhyChooseUs = () => {
    return (
        <section className="py-20 min-h-[500px] bg-gradient-to-l from-primary-blue to-sky">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0">
                <h2 className="text-3xl text-primary text-center font-poppins-semibold">Mengapa Pilih <span className="text-white">LinmRental?</span></h2>
                <article className="grid grid-cols-4 gap-6 py-10">
                    {WhyChooseUsList?.map(whyChooseUs => (
                        <article key={whyChooseUs.id} className="h-[200px] hover:-translate-y-3 transition-all ease-in-out duration-300 flex flex-col items-center justify-center gap-1 bg-white rounded-lg py-3 shadow-lg">
                            <whyChooseUs.icon  size={40} className="bg-gradient-to-b from-primary-blue to-sky rounded-full p-2 text-white mb-2" />
                            <h2 className="text-lg font-semibold">{whyChooseUs.title}</h2>
                            <p className="max-w-full text-center text-sm text-primary/50 px-4">{whyChooseUs.description}</p>
                        </article>
                    ))}
                </article>
            </div>
        </section>
    )
}

interface WhyChooseUs {
    id: number
    title: string
    description: string
    icon: IconType
}

const WhyChooseUsList: WhyChooseUs[] = [
    {
        id: 1,
        title: "2/7 Service",
        description: "Layanan pelanggan siap membantu Anda kapan saja.",
        icon: GoClock
    },
    {
        id: 2,
        title: "Asuransi Lengkap",
        description: "Perlindungan menyeluruh untuk keamanan perjalanan.",
        icon: GoShieldCheck
    },
    {
        id: 3,
        title: "Boking Mudah",
        description: "Reservasi online yang cepat dan praktis.",
        icon: IoIosCalendar
    },
    {
        id: 4,
        title: "Kualitas Terjamin",
        description: "Mobil terawat dan selalu dalam kondisi prima.",
        icon: GoStar
    },
]