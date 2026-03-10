import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/card';
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
bio: "Muhamad Amar adalah pendiri M.A.S Law Firm dengan pengalaman di bidang hukum korporasi. Ia telah menangani berbagai transaksi merger dan akuisisi (M&A) serta memberikan konsultasi strategis kepada perusahaan multinasional.",
email: "amar@lawyermas.com",
phone: "+62 812-3456-7890",
linkedin: "https://www.linkedin.com/in/muhamadamar",
experience: [
"Hukum Korporasi & M&A: Pengelolaan struktur hukum dalam transaksi merger dan akuisisi, due diligence, serta negosiasi kontrak kompleks.",
"Tata Kelola Perusahaan: Penyusunan kebijakan internal, compliance framework, dan penerapan praktik tata kelola perusahaan sesuai regulasi.",
"Kepatuhan Regulasi: Konsultasi kepatuhan terhadap UU Perseroan Terbatas, UU Pasar Modal, serta regulasi sektoral."
],
  
education: [
"Magister Manajemen (M.M.) 2023 - UPN Veteran Jakarta",
"Sarjana Hukum (S.H.) - 2024 Universitas Duta Bangsa Surakarta",
"Sarjana Manajemen (S.M.) - 2021 UPN Veteran Jakarta"
]
},

{
id: 'lawyer2',
name: "Adv. A.K.H. Hasibuan, S.H., S.Si., M.Si., CPM, CHT",
title: "Senior Partner",
specialty: "Spesialis Konsultasi Legal",
image: anggiImage,
bio: "Anggi Khairina adalah Senior Partner di M.A.S Law Firm dengan spesialisasi di bidang kekayaan intelektual dan hukum merek dagang. Dengan pengalaman lebih dari 12 tahun, ia telah membantu banyak klien dalam melindungi dan mengelola aset intelektual mereka.",
email: "a.khairina@maslawfirm.com",
phone: "+62 812-8198-8649",
linkedin: "https://www.linkedin.com/in/anggi-khairina-hasibuan",
experience: [
"Kekayaan Intelektual & Merek Dagang: Pendaftaran, perlindungan, dan litigasi merek dagang, termasuk penanganan ratusan pendaftaran dan puluhan sengketa merek di Indonesia.",
"Dokumentasi Korporat: Penyusunan dan peninjauan berbagai dokumen hukum, seperti kontrak komersial, perjanjian bisnis, dan lisensi.",
"Konsultasi Strategis IP: Pendampingan bagi startup dan perusahaan dalam membangun serta mengelola portofolio kekayaan intelektual."
],
  
education: [
"Sarjana Kimia (S.Si) 2009 - 2015 Universitas Negeri Surabaya",
"Magister Ilmu dan Teknologi Forensik (M.Si) 2015 - 2018 Universitas Airlangga",
"Sarjana Ilmu Hukum (S.H) 2021 - 2024 Universitas Duta Bangsa Surakarta",
"Sarjana Ilmu Psikilogi (S.Psi) 2021-sekarang Universitas Teknologi Nusantara"
]
}

];

return (

<section className="py-24 bg-white min-h-screen">

<div className="container mx-auto px-6">

<div className="text-center mb-16">
<div className="inline-block w-12 h-1 bg-[#AE8737] mb-6"></div>
<h2 className="mb-4 text-[#191919]">Tim Pengacara Kami</h2>

<p className="text-gray-300 max-w-2xl mx-auto text-lg">
Profesional hukum berpengalaman yang berdedikasi melindungi kepentingan Anda
</p>
</div>

{/* LAWYER LIST */}

<div className="flex flex-col items-center gap-24 max-w-3xl mx-auto">

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

<div className="relative flex justify-center mb-6">

<div className="w-[380px] h-[380px] rounded-full overflow-hidden border-[5px] border-[#AE8737] shadow-2xl">

<img
src={lawyer.image}
alt={lawyer.name}
className="w-full h-full object-cover object-[center_15%] scale-110"
/>

</div>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
transition={{ duration: 0.3 }}
className="absolute inset-0 flex items-center justify-center"
>

<div className="w-16 h-16 rounded-full bg-[#AE8737] flex items-center justify-center shadow-lg">
<Plus className="w-8 h-8 text-[#191919]"/>
</div>

</motion.div>

</div>

<h3 className="text-2xl font-bold text-[#191919] mb-2">
{lawyer.name}
</h3>

<p className="text-[#AE8737] font-semibold mb-1">
{lawyer.title}
</p>

<p className="text-gray-400 text-sm mb-4">
{lawyer.specialty}
</p>

<div className="flex justify-center mt-4">

<a
href={lawyer.linkedin}
target="_blank"
rel="noopener noreferrer"
className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 hover:border-[#AE8737] hover:bg-[#AE8737] transition"
onClick={(e) => e.stopPropagation()}
>

<Linkedin className="w-5 h-5 text-[#191919]"/>

</a>

</div>

</Card>

</motion.div>

))}

</div>

</div>

{/* MODAL */}

<AnimatePresence>

{selectedLawyer && (

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-50 flex items-center justify-center p-6"
>

<div
className="fixed inset-0 bg-black/70 backdrop-blur-sm"
onClick={() => setSelectedLawyer(null)}
/>

<motion.div
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
className="relative z-50 w-full max-w-xl bg-white rounded-xl p-10 shadow-2xl text-center"
>

<button
onClick={() => setSelectedLawyer(null)}
className="absolute top-4 right-4"
>

<X className="w-6 h-6"/>

</button>

<img
src={selectedLawyer.image}
alt={selectedLawyer.name}
className="w-40 h-40 object-cover rounded-full mx-auto mb-6"
/>

<h3 className="text-2xl font-bold mb-2">
{selectedLawyer.name}
</h3>

<p className="text-[#AE8737] font-semibold mb-4">
{selectedLawyer.title}
</p>
<div className="text-gray-700 text-left mt-6 space-y-6">

{/* BIO */}
<p className="leading-relaxed">
{selectedLawyer.bio}
</p>

{/* EXPERIENCE */}
{selectedLawyer.experience?.length > 0 && (
<div>
<h4 className="font-bold text-[#AE8737] mb-2">
Experience & Expertise
</h4>

<ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
{selectedLawyer.experience.map((exp, idx) => (
<li key={idx}>{exp}</li>
))}
</ul>

</div>
)}

{/* EDUCATION */}
{selectedLawyer.education?.length > 0 && (
<div>
<h4 className="font-bold text-[#AE8737] mb-2">
Education
</h4>

{selectedLawyer.education.map((edu, idx) => (
<div key={idx} className="mb-3">

<p className="font-semibold text-gray-900">
{edu.degree}
</p>

<p className="text-sm text-gray-600">
{edu.school} • {edu.year}
</p>

{edu.honor && (
<p className="text-xs text-[#AE8737] italic">
{edu.honor}
</p>
)}

</div>
))}
</div>
)}

</div>


<div className="flex justify-center gap-6">

<a href={`mailto:${selectedLawyer.email}`}>
<Mail/>
</a>

<a href={`tel:${selectedLawyer.phone}`}>
<Phone/>
</a>

<a href={selectedLawyer.linkedin}>
<Linkedin/>
</a>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

</section>

);
}
