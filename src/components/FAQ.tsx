import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';

const QA = [
  {
    q: "Preciso ter experiência prévia para fazer a mentoria?",
    a: "Não. A mentoria foi desenhada para pegar você pela mão desde o absoluto zero até o nível profissional."
  },
  {
    q: "Qual o capital mínimo necessário para começar?",
    a: "Recomendamos um capital inicial que você possa arriscar sem comprometer seu orçamento, podendo começar com valores a partir de R$ 500."
  },
  {
    q: "Como funciona o suporte de 1 ano?",
    a: "Você terá acesso direto a nossa equipe via plataforma e grupo exclusivo para tirar qualquer dúvida operacional ou técnica."
  },
  {
    q: "Quanto tempo preciso dedicar por dia?",
    a: "Com cerca de 1 a 2 horas por dia, você já consegue estudar as aulas e aplicar a estratégia Retração M1 no mercado."
  },
  {
    q: "A estratégia realmente tem 90% de acerto?",
    a: "Sim. A taxa de 90% é baseada num histórico consolidado com as devidas filtragens. Se seguir as regras à risca, a consistência é matemática."
  },
  {
    q: "E se eu não ficar satisfeito?",
    a: "Oferecemos uma garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro sem perguntas."
  }
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-brand-bg relative" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading tracking-wider uppercase">
            PERGUNTAS <span className="text-brand-green">FREQUENTES</span>
          </h2>
          <p className="text-brand-muted mt-4 text-lg">Tire todas as suas dúvidas</p>
        </motion.div>

        <div className="space-y-4">
          {QA.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-brand-card rounded-lg overflow-hidden border transition-colors ${openIndex === i ? 'border-[rgba(57,255,20,0.5)] shadow-[0_0_20px_rgba(57,255,20,0.1)]' : 'border-[rgba(57,255,20,0.1)] hover:border-[rgba(57,255,20,0.3)]'}`}
            >
              <button 
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggle(i)}
              >
                <span className={`font-bold pr-8 ${openIndex === i ? 'text-brand-green' : 'text-brand-text'}`}>
                  {item.q}
                </span>
                <Plus 
                  className={`shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45 text-brand-green' : 'text-brand-muted'}`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                  openIndex === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-brand-muted">{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
