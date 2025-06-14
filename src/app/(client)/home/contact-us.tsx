"use client"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { IoCallOutline, IoLocationOutline, IoMailOpenOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import Autoplay from "embla-carousel-autoplay"

export const ContactUs = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-primary-blue to-primary">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl text-white text-center font-poppins-semibold">
          Hubungi <span className="bg-gradient-to-r from-primary-blue to-sky bg-clip-text text-transparent">Kami?</span>
        </h2>
        <p className="text-center text-white/50">Siap membantu perjalanan Anda.</p>

        <article className=" grid grid-cols-2 gap-10 py-10">
          <article className="space-y-4">
            {ContactUsList?.map((contactUs) => (
              <article key={contactUs.id} className="backdrop-blur-3xl bg-white/5 rounded-md p-4 flex items-center gap-4">
                <contactUs.icon className="text-white text-xl" />
                <h3 className="text-white font-poppins-medium text-base">{contactUs.title}</h3>
                <p className="text-white/50 text-sm">{contactUs.description}</p>
              </article>
            ))}
          </article>
          <article className='w-full'>
            <Carousel opts={{loop: true}} plugins={[Autoplay({delay: 3000})]}>
                <CarouselContent className='h-[200px]'>
                    <CarouselItem className='basis-1/1 h-full'>
                        <article className="w-full relative h-full p-4 bg-primary-blue rounded-lg overflow-hidden">
                            <h3 className=' max-w-1/2 text-white text-shadow'>Platform terbaik untuk penyewaan mobil.</h3>
                            <Image src={'/car-hero-1.svg'} alt="linmRental" width={100} height={50} className="absolute inset-0 flex items-center justify-center w-full h-full" />
                        </article>
                    </CarouselItem>
                    <CarouselItem className='basis-1/1 h-full'>
                        <article className="w-full relative h-full p-4 bg-primary-blue rounded-lg overflow-hidden">
                            <h3 className=' max-w-1/2 text-white text-shadow'>Cara mudah menyewa mobil dengan harga murah.</h3>
                            <Image src={'/car-hero-2.svg'} alt="linmRental" width={100} height={50} className="absolute inset-0 flex items-center justify-center w-full h-full" />
                        </article>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
          </article>
        </article>
      </div>
    </section>
  );
};

interface ContactUs {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}

const ContactUsList: ContactUs[] = [
  {
    id: 1,
    title: 'Telepon',
    description: '+62 853 2270 1120',
    icon: IoCallOutline,
  },
  {
    id: 2,
    title: 'Email',
    description: 'linmidofficial@gmail.com',
    icon: IoMailOpenOutline,
  },
  {
    id: 3,
    title: 'Alamat',
    description: 'Jl. Raya Desa Muncangela, Kuningan, Jawa Barat',
    icon: IoLocationOutline,
  },
];
