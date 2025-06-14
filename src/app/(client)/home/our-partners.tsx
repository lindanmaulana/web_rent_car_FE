import Image from "next/image";

export const TrustedBy = () => {
  return (
    <section className="py-20">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl text-primary text-center font-poppins-semibold">
          Mitra & kolaborasi <span className="bg-gradient-to-r from-primary-blue to-sky bg-clip-text text-transparent">kami</span>
        </h2>
        <p className="text-center text-primary/50">Mitra terpercaya yang turut mendukung layanan terbaik kami.</p>

        <article className="grid grid-cols-3 gap-2 py-10">
            <article className="w-full h-full p-4 flex items-center justify-center">
                <Image src={"/images/company/bmw-performance.png"} alt="Bmw Performance" width={100} height={40} className="w-3/4" unoptimized />
            </article>
            <article className="w-full h-full p-4 flex items-center justify-center">
                <Image src={"/images/company/trd-sport.png"} alt="Bmw Performance" width={100} height={40} className="w-3/4" unoptimized />
            </article>
            <article className="w-full h-full p-4 flex items-center justify-center">
                <Image src={"/images/company/mclaren-applied-technologies.png"} alt="Bmw Performance" width={100} height={40} className="w-3/4" unoptimized />
            </article>
        </article>
      </div>
    </section>
  );
};
