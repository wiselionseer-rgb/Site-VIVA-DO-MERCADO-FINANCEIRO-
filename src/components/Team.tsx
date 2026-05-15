import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Instagram, Twitter, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Tiago Passos",
    role: "Proprietário & Fundador da Primezys",
    image: "/tiago-socicio.jpg",
    bio: "Visionário por trás da Primezys Investimentos, Tiago Passos fundou a empresa com a missão de democratizar o acesso às estratégias de elite do mercado financeiro. Com foco em tecnologia e inovação, ele lidera a expansão da marca para transformar a vida de milhares de brasileiros.",
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Lucas & Alessandra",
    role: "Diretores de Marketing & Suporte",
    image: "/lucas-alessandra.jpg",
    bio: "Responsáveis pelo suporte e apoio estratégico da Primezys. Com uma dedicação de 23 horas por dia, eles garantem que a nossa comunidade tenha todo o suporte necessário para operar com tranquilidade e foco nos resultados.",
    social: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

export default function Team() {
  return (
    <section className="py-32 bg-black relative overflow-hidden" id="partners">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.03),transparent)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-green uppercase">União de Resultados</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-heading tracking-tight text-white mb-6">
            PARCEIROS <span className="text-brand-green">ESTRATÉGICOS</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-lg md:text-xl">
            A elite por trás da Primezys Investimentos. Especialistas dedicados ao seu sucesso e consistência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative flex flex-col h-full rounded-[2rem] overflow-hidden border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand-green/30 transition-all duration-500 ${
                i === 0 ? "lg:scale-105 lg:z-10 bg-white/[0.05] border-white/10" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-brand-green text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                    {member.role}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading text-white drop-shadow-md">
                    {member.name}
                  </h3>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className="text-brand-muted leading-relaxed mb-8 flex-grow">
                  {member.bio}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4">
                    <a href={member.social.instagram} className="text-white/40 hover:text-brand-green transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href={member.social.linkedin} className="text-white/40 hover:text-brand-green transition-colors">
                      <Linkedin size={20} />
                    </a>
                  </div>
                  <Quote className="text-brand-green/10" size={32} />
                </div>
              </div>

              {/* Founder Highlight Ornament */}
              {i === 0 && (
                <div className="absolute top-4 right-4 bg-brand-green text-black text-[10px] font-black px-3 py-1 rounded-full tracking-tighter uppercase shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                  FUNDADOR
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
