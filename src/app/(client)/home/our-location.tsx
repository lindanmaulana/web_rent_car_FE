import { Card, CardContent } from "@/components/ui/card";
import { GoClock } from "react-icons/go";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";

export const OurLocation = () => {
  return (
    <section className="py-20">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl text-primary text-center font-poppins-semibold">
          Lokasi <span className="bg-gradient-to-r from-primary-blue to-sky bg-clip-text text-transparent">Kami?</span>
        </h2>
        <p className="text-center text-primary/50">Kunjugi kantor kami di Kuningan untuk mendapatkan pelayanan terbaik.</p>
        <div className="w-full rounded-md py-10 space-y-4 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.359603772395!2d108.54193847356616!3d-6.966835568211758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f115dbb5d8afd%3A0xb8ce9f03acea3c44!2sMushola%20Al-Hidayah!5e0!3m2!1sen!2sid!4v1749876936688!5m2!1sen!2sid"
            className="w-full h-[400px]"
            loading="lazy"
          ></iframe>

          <Card className="bg-white rounded-md">
            <CardContent className="space-y-2">
                <h3 className="text-xl font-poppins-medium">Kantor Pusat</h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-sm text-primary/50"><IoLocationOutline className="text-lg text-primary-blue" /> Jl. Raya Desa Muncangela, Kec. Cipicung, Kab. Kuningan, Jawa Barat</li>
                    <li className="flex items-center gap-3 text-sm text-primary/50"><IoCallOutline className="text-lg text-primary-blue" /> +62 853 2270 1120</li>
                    <li className="flex items-center gap-3 text-sm text-primary/50"><IoMailOutline className="text-lg text-primary-blue" /> linmidofficial@gmail.com</li>
                    <li className="flex items-center gap-3 text-sm text-primary/50"><GoClock className="text-lg text-primary-blue" /> Buka Setiap Hari 08.00 - 21.00 WIB</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
