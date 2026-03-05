import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/card";
import { X, Linkedin, Mail, Phone } from "lucide-react";

import pakAmarImage from "/amar.jpeg";
import anggiImage from "/anggi.jpeg";

export function TimPengacara() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    if (selectedLawyer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedLawyer]);

  const lawyers = [
    {
      id: "lawyer1",
      name: "Adv. Muhamad Amar, S.H., S.M., M.M., CTT",
      title: "Managing Partner",
      specialty: "Spesialis Hukum Korporasi",
      image: pakAmarImage,
      email: "amar@lawyermas.com",
      phone: "+62 812-3456-7890",
      linkedin:
        "https://www.linkedin.com/in/muhamadamar",
      bio: "Muhamad Amar adalah pendiri M.A.S Law Firm dengan pengalaman profesional di bidang hukum korporasi.",
    },
    {
      id: "lawyer2",
      name: "Adv. A.K.H. Hasibuan, S.H., S.Si., M.Si., CPM, CHT",
      title: "Senior Partner",
      specialty: "Spesialis Konsultasi Legal",
      image: anggiImage,
      email: "a.khairina@maslawfirm.com",
      phone: "+62 812-8198-8649",
      linkedin:
        "https://www.linkedin.com/in/anggi-khairina-hasibuan",
      bio: "Anggi Khairina adalah Senior Partner di M.A.S Law Firm dengan keahlian khusus di bidang kekayaan intelektual.",
    },
  ];

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <div className="w-12 h-1 bg-[#AE8737] mx-auto mb-6"></div>
          <h1 className="text-3xl font-bold text-[#191919] mb-4">
            Tim Pengacara
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Profesional hukum berpengalaman yang berdedikasi melindungi
            kepentingan klien dengan integritas dan keahlian.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

          {lawyers.map((lawyer) => (
            <motion.div
              key={lawyer.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-center cursor-pointer"
              onClick={() => setSelectedLawyer(lawyer)}
            >

              <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden">

                {/* PHOTO */}
                <div className="relative overflow-hidden">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-[420px] object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="p-6">

                  <h3 className="text-xl font-semibold text-[#191919] mb-1">
                    {lawyer.name}
                  </h3>

                  <p className="text-[#AE8737] font-medium text-sm mb-3">
                    {lawyer.title}
                  </p>

                  <p className="text-slate-500 text-sm mb-4">
                    {lawyer.specialty}
                  </p>

                  {/* LINKEDIN */}
                  <a
                    href={lawyer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-[#AE8737] hover:bg-[#AE8737] hover:text-white transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                </div>

              </Card>
            </motion.div>
          ))}

        </div>
      </div>

      {/* MODAL PROFILE */}
      <AnimatePresence>
        {selectedLawyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelectedLawyer(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-lg max-w-4xl w-full p-10 shadow-2xl"
            >

              {/* CLOSE */}
              <button
                onClick={() => setSelectedLawyer(null)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-10 items-center">

                <img
                  src={selectedLawyer.image}
                  alt={selectedLawyer.name}
                  className="w-full rounded-lg"
                />

                <div>

                  <h2 className="text-3xl font-bold text-[#191919] mb-2">
                    {selectedLawyer.name}
                  </h2>

                  <p className="text-[#AE8737] font-semibold mb-4">
                    {selectedLawyer.title}
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedLawyer.bio}
                  </p>

                  <div className="flex gap-4">

                    <a
                      href={`mailto:${selectedLawyer.email}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>

                    <a
                      href={`tel:${selectedLawyer.phone}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Phone
                    </a>

                    <a
                      href={selectedLawyer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>

                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}