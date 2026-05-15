import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "PRIME SINAIS",
      price: "189,90",
      period: "/mês",
      features: ["Sinais diários Telegram", "Análise pré-mercado", "Retração M1 ao vivo"],
      button: "ASSINAR",
      style: "border-[rgba(57,255,20,0.3)] bg-brand-card hover:border-[rgba(57,255,20,0.6)] hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]",
      btnStyle: "border border-brand-green text-brand-green hover:bg-brand-green hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]",
      delay: 0.1
    },
    {
      name: "CURSO RETRAÇÃO M1",
      price: "599,90",
      period: " único",
      features: ["6 módulos completos", "Acesso vitalício", "Todas atualizações"],
      button: "COMPRAR",
      style: "border-[rgba(57,255,20,0.3)] bg-brand-card hover:border-[rgba(57,255,20,0.6)] hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]",
      btnStyle: "bg-brand-green text-black hover:bg-[#a3ff20] hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]",
      delay: 0.2
    },
    {
      name: "MENTORIA EM GRUPO",
      badge: "⭐ MAIS POPULAR",
      price: "1.290,90",
      period: "/mês",
      features: ["Tudo do curso", "Aulas ao vivo semanais", "Comunidade premium", "Sinais inclusos"],
      button: "QUERO COMEÇAR",
      style: "border-brand-green bg-[rgba(57,255,20,0.05)] scale-100 lg:scale-105 z-10 shadow-[0_0_40px_rgba(57,255,20,0.25)]",
      btnStyle: "bg-brand-green text-black animate-pulse-shadow uppercase font-bold hover:bg-[#a3ff20]",
      guarantee: "🛡 Garantia incondicional de 7 dias",
      delay: 0.3
    },
    {
      name: "MENTORIA INDIVIDUAL",
      price: "4.990,00",
      period: "",
      features: ["Tudo do grupo", "Sessões 1:1", "Acompanhamento diário", "Plano personalizado"],
      button: "QUERO 1:1",
      style: "border-[rgba(255,215,0,0.2)] bg-brand-card hover:border-[rgba(255,215,0,0.4)]",
      btnStyle: "bg-brand-gold text-black hover:opacity-90",
      delay: 0.4
    },
    {
      name: "BLACK VITALÍCIO",
      badge: "♟ BLACK",
      scratched: "R$ 6.990,00",
      price: "6.990,00",
      period: "",
      features: ["Tudo incluso", "Suporte vitalício", "Futuros cursos GRÁTIS", "Sala VIP / Mastermind"],
      button: "QUERO O BLACK",
      style: "border-[rgba(255,215,0,0.3)] bg-black shadow-[0_0_20px_rgba(255,215,0,0.05)]",
      btnStyle: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black",
      delay: 0.5
    }
  ];

  return (
    <section id="planos" className="py-24 bg-brand-bg relative" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-heading tracking-wider uppercase">
            COMECE SUA <span className="text-brand-green">TRANSFORMAÇÃO</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              className={`flex flex-col relative rounded-2xl border p-6 transition-transform hover:-translate-y-2 h-full ${plan.style}`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-widest whitespace-nowrap
                  ${plan.badge.includes('BLACK') ? 'bg-brand-gold text-black' : 'bg-brand-green text-black'}
                `}>
                  {plan.badge}
                </div>
              )}

              <h3 className="font-bold text-center text-sm tracking-widest uppercase mb-6 mt-2 text-brand-muted">
                {plan.name}
              </h3>

              <div className="text-center mb-6 flex-grow">
                {plan.scratched && (
                  <div className="text-sm text-brand-muted line-through mb-1 opacity-50">{plan.scratched}</div>
                )}
                <div className="flex items-end justify-center gap-1">
                  <span className="text-sm text-brand-muted mb-1 pb-1">R$</span>
                  <span className={`text-4xl font-heading ${plan.badge?.includes('BLACK') ? 'text-brand-gold' : ''}`}>{plan.price}</span>
                  <span className="text-xs text-brand-muted mb-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.7)]">
                    <Check size={16} className={`shrink-0 mt-0.5 ${plan.badge?.includes('BLACK') || plan.name.includes('INDIVIDUAL') ? 'text-brand-gold' : 'text-brand-green'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <button className={`w-full py-3 rounded text-sm font-bold transition-all ${plan.btnStyle}`}>
                  {plan.button}
                </button>
                
                {plan.guarantee && (
                  <div className="text-center text-xs text-brand-muted flex items-center justify-center gap-1 mt-2">
                    {plan.guarantee}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
