import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      linkedin: "https://www.linkedin.com/in/muhamadamar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      id: 'lawyer2',
      name: "Adv. A.K.H. Hasibuan, S.H., S.Si., M.Si., CPM, CHT",
      title: "Senior Partner",
      specialty: "Spesialis Konsultasi Legal",
      image: anggiImage,
      linkedin: "https://www.linkedin.com/in/anggi-khairina-hasibuan",
    }
  ];

  return (
    <section className="py-24 bg-[#191919] min-h-screen">
      <div className="container mx-auto px-6">

        <div className="text-center mb-20">
          <div className="inline-block w-12 h-1 bg-[#AE8737] mb-6"></div>
          <h2 className="mb-4 text-white">Tim Pengacara Kami</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Profesional hukum berpengalaman yang berdedikasi melindungi kepentingan Anda
          </p>
        </div>

        {/* Lawyer List */}
        <div className="flex flex-col items-center gap-20 max-w-4xl mx-auto">

          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedLawyer(lawyer)}
              className="cursor-pointer text-center"
            >

              <Card className="bg-transparent border-none shadow-none">

                {/* FOTO BULAT */}
                <div className="relative flex justify-center mb-6">

                  <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-[#AE8737] shadow-xl">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#AE8737] flex items-center justify-center shadow-lg">
                      <Plus className="w-8 h-8 text-white" strokeWidth={2.5}/>
                    </div>
                  </motion.div>

                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lawyer.name}
                  </h3>

                  <p className="text-[#AE8737] font-semibold text-base mb-2">
                    {lawyer.title}
                  </p>

                  <p className="text-gray-400 text-sm mb-4">
                    {lawyer.specialty}
                  </p>

                  {/* LinkedIn */}
                  <a
                    href={lawyer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 hover:border-[#AE8737] hover:bg-[#AE8737] transition"
                  >
                    <Linkedin className="w-5 h-5 text-white"/>
                  </a>

                </div>

              </Card>

            </motion.div>
          ))}

        </div>
      </div>

      {/* Modal tetap sama seperti kode Anda sebelumnya */}
    </section>
  );
}