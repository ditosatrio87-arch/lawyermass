import { useState } from 'react';
import { Building2, Scale, FileText, Briefcase, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function LayananKami() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Building2,
      title: "Corporate Lawyer",
      description:
        "Solusi hukum komprehensif yang dirancang untuk menjaga stabilitas dan pertumbuhan bisnis Anda.",
      detail:
        "Layanan Corporate Lawyer mencakup pendirian perusahaan, legal audit, perjanjian bisnis, kepatuhan hukum, hingga pendampingan transaksi korporasi."
    },
    {
      icon: Scale,
      title: "Pendaftaran Hak Atas Kekayaan Intelektual (HAKI)",
      description:
        "Perlindungan hukum permanen untuk ide, karya, dan identitas bisnis Anda.",
      detail:
        "Kami membantu proses pendaftaran merek, hak cipta, paten, serta pendampingan sengketa kekayaan intelektual."
    },
    {
      icon: FileText,
      title: "Company Branding",
      description:
        "Integrasi antara kekuatan hukum dan reputasi publik untuk memperkuat posisi pasar Anda.",
      detail:
        "Meliputi perlindungan nama usaha, legalitas brand, struktur identitas hukum, serta mitigasi risiko hukum terhadap reputasi bisnis."
    },
    {
      icon: Briefcase,
      title: "Civil Litigation and Mediation",
      description:
        "Penyelesaian sengketa hukum yang strategis di dalam maupun di luar pengadilan.",
      detail:
        "Pendampingan perkara perdata, negosiasi, mediasi, hingga representasi di pengadilan dengan strategi hukum yang efektif."
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

      {/* Modal Popup */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white max-w-lg w-full rounded-xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold text-[#191919] mb-4">
              {selectedService.title}
            </h3>

            <p className="text-s refers to a location or address. This field is optional and can be used to store additional information or disambiguation about the entity.",
            }
        ],
        "additionalItems": false
    }
}