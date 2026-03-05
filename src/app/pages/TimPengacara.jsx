import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, X, Mail, Phone, Linkedin } from 'lucide-react';
import pakAmarImage from '/amar.jpeg';
import anggiImage from '/anggi.jpeg';

export function TimPengacara() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    if (selectedLawyer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedLawyer]);

  const lawyers = [
    {
      id: 'lawyer1',
      name: "Adv. Muhamad Amar, S.H., S.M., M.M., CTT",
      title: "Managing Partner of MAS Law Firm",
      specialty: "Spesialis Hukum Korporasi",
      image: pakAmarImage,
      bio: "Muhamad Amar adalah pendiri M.A.S Law Firm dengan pengalaman profesional di bidang hukum korporasi. Beliau telah menangani berbagai transaksi M&A bernilai tinggi dan memberikan konsultasi strategis kepada perusahaan multinasional.",
      email: "amar@lawyermas.com",
      phone: "+62 812-3456-7890",
      linkedin: "https://www.linkedin.com/in/muhamadamar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      experience: [],
      education: []
    },
    {
      id: 'lawyer2',
      name: "Adv. A.K.H. Hasibuan, S.H., S.Si., M.Si., CPM, CHT",
      title: "Senior Partner",
      specialty: "Spesialis Konsultasi Legal",
      image: anggiImage,
      bio: "Anggi Khairina adalah Senior Partner di M.A.S Law Firm dengan keahlian khusus di bidang kekayaan intelektual dan hukum merek dagang.",
      email: "a.khairina@maslawfirm.com",
      phone: "+62 812-8198-8649",
      linkedin: "https://www.linkedin.com/in/anggi-khairina-hasibuan",
      experience: [],
      education: []
    }
  ];

  return (
    <section className="py-24 bg-[#191919] min-h-screen">
      <div className="container mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-20">
          <div className="w-12 h-1 bg-[#AE8737] mx-auto mb-6"></div>
          <h2 className="text-white text-3xl font-bold mb-4">
            Tim Pengacara Kami
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Profesional hukum berpengalaman yang berdedikasi melindungi kepentingan klien
          </p>
        </div>

        {/* LAWYER LIST (VERTICAL) */}
        <div className="flex flex-col items-center gap-20 max-w-3xl mx-auto">

          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedLawyer(lawyer)}
              className="cursor-pointer text-center"
            >

              <Card className="bg-transparent border-none shadow-none">

                {/* PROFILE PHOTO */}
                <div className="relative flex justify-center mb-6">

                  <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-[#AE8737] shadow-xl">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hover Icon */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#AE8737] flex items-center justify-center shadow-lg">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>

                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lawyer.name}
                  </h3>

                  <p className="text-[#AE8737] font-semibold mb-1">
                    {lawyer.title}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {lawyer.specialty}
                  </p>
                </div>

              </Card>

            </motion.div>
          ))}

        </div>
      </div>

      {/* POPUP MODAL (TIDAK DIUBAH) */}
      <AnimatePresence>
        {selectedLawyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-[#191919]/90 backdrop-blur-sm"
              onClick={() => setSelectedLawyer(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setSelectedLawyer(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#191919]/10 hover:bg-[#191919]/20 rounded-full transition-colors text-[#191919]"
              >
                <X className="w-6 h-6" />
              </button>

              {/* POPUP CONTENT TETAP SAMA */}
              {/* Anda bisa biarkan seluruh isi popup sebelumnya tetap */}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}