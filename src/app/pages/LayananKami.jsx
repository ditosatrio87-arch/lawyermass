import { useState } from 'react';
import { Building2, Scale, FileText, Briefcase, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function LayananKami() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Building2,
      title: "Corporate Lawyer",
      description: "Solusi hukum komprehensif untuk menjaga stabilitas dan pertumbuhan bisnis Anda.",
      detail:
        "Kami memberikan pendampingan hukum perusahaan mulai dari pendirian, perizinan, kontrak bisnis, hingga manajemen risiko hukum untuk memastikan operasional berjalan aman dan sesuai regulasi."
    },
    {
      icon: Scale,
      title: "Pendaftaran HAKI",
      description: "Perlindungan hukum untuk merek, logo, dan karya bisnis Anda.",
      detail:
        "Layanan pendaftaran merek, hak cipta, dan kekayaan intelektual lainnya agar bisnis Anda memiliki perlindungan hukum penuh dari pelanggaran atau penggunaan tanpa izin."
    },
    {
      icon: FileText,
      title: "Company Branding",
      description: "Penguatan citra bisnis dari sisi hukum dan reputasi.",
      detail:
        "Kami membantu memastikan identitas bisnis Anda memiliki dasar hukum yang kuat sekaligus mendukung kepercayaan publik dan posisi kompetitif di pasar."
    },
    {
      icon: Briefcase,
      title: "Civil Litigation & Mediation",
      description: "Penyelesaian sengketa secara litigasi maupun non-litigasi.",
      detail:
        "Pendampingan dalam proses pengadilan maupun mediasi untuk mencapai solusi terbaik dengan pendekatan strategis dan efisien."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block w-12 h-1 bg-[#AE8737] mb-6"></div>
          <h2 className="mb-4 text-[#191919]">Layanan Kami</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Layanan hukum komprehensif yang disesuaikan dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                onClick={() => setSelectedService(service)}
                className="cursor-pointer border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#AE8737]/50 transition-all duration-300 bg-white group"
              >
                <CardContent className="p-7">
                  <div className="w-14 h-14 bg-[#AE8737]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#AE8737]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#AE8737]" />
                  </div>
                  <h3 className="mb-3 text-[#191919]">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#191919] mb-4">
              {selectedService.title}
            </h3>

            <p className="text-slate-600 leading-relaxed">
              {selectedService.detail}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}