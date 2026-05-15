import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "João Silva",
      plan: "Mentoria em Grupo",
      text: "Depois da mentoria, comecei a consistentemente ter retornos positivos. A metodologia do Patreze é simplesmente incrível...",
      initial: "J"
    },
    {
      name: "Maria Santos",
      plan: "Mentoria Individual",
      text: "O suporte e acompanhamento são excepcionais. Aprendi mais em 3 meses do que em 3 anos sozinha...",
      initial: "M"
    },
    {
      name: "Pedro Costa",
      plan: "Mentoria em Grupo",
      text: "Cada aula rendeu R$ 11.000+ de lucro. Não é exagero. O método funciona de verdade...",
      initial: "P"
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-brand-bg2 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading tracking-wider uppercase">
            O QUE DIZEM NOSSOS <span className="text-brand-green">ALUNOS</span>
          </h2>
          <p className="text-brand-muted mt-4 text-lg">Histórias reais de transformação financeira</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-brand-card p-8 rounded-2xl border border-[rgba(57,255,20,0.1)] hover:border-[rgba(57,255,20,0.4)] transition-all hover:shadow-[0_0_25px_rgba(57,255,20,0.1)] hover:-translate-y-2"
            >
              <div className="flex gap-1 mb-6 text-brand-gold">
                {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
              </div>
              
              <p className="italic text-brand-muted mb-8 leading-relaxed">
                "{test.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green/20 to-brand-green/5 border border-brand-green/20 flex items-center justify-center font-heading text-xl text-brand-green">
                  {test.initial}
                </div>
                <div>
                  <h4 className="font-bold text-brand-text">{test.name}</h4>
                  <p className="text-xs text-brand-green font-bold uppercase tracking-wider">{test.plan}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
