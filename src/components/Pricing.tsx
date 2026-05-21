import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Check, ShieldCheck, X, Zap, Target, Headset, Calendar, ExternalLink } from 'lucide-react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPlansModal, setShowPlansModal] = useState(false);

  const plans = [
    {
      name: "PRIME SINAIS",
      price: "197,00",
      period: "/mês",
      features: ["Sinais ao vivo no Telegram", "Indicador Primezys", "Suporte & Acompanhamento"],
      button: "💎 PLANOS PRIMEZYS",
      isSpecial: true,
      style: "border-brand-green/40 bg-brand-green/5 hover:border-brand-green/80 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]",
      btnStyle: "bg-brand-green text-black animate-pulse-shadow uppercase font-bold hover:bg-[#a3ff20]",
      delay: 0.1
    },
    {
      name: "CURSO RETRAÇÃO M1",
      price: "599,90",
      period: " único",
      features: ["6 módulos completos", "Acesso vitalício", "Todas atualizações"],
      button: "COMPRAR",
      link: "https://wa.me/5566996280883",
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
      link: "https://wa.me/5566996280883",
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
      link: "https://wa.me/5566996280883",
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
      link: "https://wa.me/5566996280883",
      style: "border-[rgba(255,215,0,0.3)] bg-black shadow-[0_0_20px_rgba(255,215,0,0.05)]",
      btnStyle: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black",
      delay: 0.5
    }
  ];

  const subscriptionOptions = [
    {
      title: "Mensal",
      price: "R$ 197,00",
      desc: "Pagamento mês a mês",
      link: "https://pay.kiwify.com.br/v9OLrDx",
      icon: <Calendar className="text-brand-green" size={20} />
    },
    {
      title: "Trimestral",
      price: "R$ 539,70",
      subprice: "ou 3x de R$ 192,60",
      desc: "Economize garantindo 3 meses",
      link: "https://pay.kiwify.com.br/LAMEKnd",
      isPopular: true,
      icon: <Zap className="text-brand-gold" size={20} />
    },
    {
      title: "Semestral",
      price: "R$ 959,40",
      subprice: "ou até 6x de R$ 179,99",
      desc: "Ideal para consistência plena",
      link: "https://pay.kiwify.com.br/1aQKXyS",
      icon: <Target className="text-sky-400" size={20} />
    },
    {
      title: "Anual",
      price: "R$ 1.119,00",
      subprice: "ou até 12x de R$ 115,73",
      desc: "O melhor custo-benefício",
      link: "https://pay.kiwify.com.br/xEGkCLF",
      icon: <Check className="text-brand-green" size={20} />
    }
  ];

  return (
    <section id="planos" className="py-24 bg-brand-bg relative" ref={ref}>
      {/* Plans Modal */}
      <AnimatePresence>
        {showPlansModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPlansModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-brand-card border border-brand-green/30 p-6 sm:p-10 rounded-3xl z-[101] shadow-[0_0_100px_rgba(57,255,20,0.15)] h-fit"
            >
              <button 
                onClick={() => setShowPlansModal(false)}
                className="absolute top-6 right-6 text-brand-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 border border-brand-green/20 rounded-full text-brand-green text-[10px] font-bold uppercase tracking-widest mb-4">
                  💎 EXPERIÊNCIA COMPLETA
                </div>
                <h3 className="text-3xl sm:text-4xl font-heading text-white tracking-wider mb-4 uppercase">
                  PLANOS <span className="text-brand-green">PRIMEZYS</span>
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed max-w-xl">
                  Selecione a melhor opção para sua jornada. Todos os planos incluem acesso total à nossa sala de sinais e suporte exclusivo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="col-span-full">
                  <h4 className="text-xs font-bold text-brand-green uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} /> O que você vai receber:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {[
                      "Sinais ao vivo no Telegram",
                      "Operações das 22:00 às 17:00",
                      "Indicador Primezys",
                      "Sinal visual da vela da operação",
                      "Marcação automática de entrada",
                      "Suporte Primezys",
                      "Auxílio para ativação & uso"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Check size={14} className="text-brand-green shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subscriptionOptions.map((opt, i) => (
                  <a 
                    key={i}
                    href={opt.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col p-5 rounded-2xl border transition-all hover:-translate-y-1 h-full
                      ${opt.isPopular ? 'bg-white/5 border-brand-gold/40 hover:border-brand-gold' : 'bg-black/40 border-white/5 hover:border-white/20'}
                    `}
                  >
                    {opt.isPopular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Popular
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      {opt.icon}
                      <ExternalLink size={14} className="text-white/20 group-hover:text-brand-green" />
                    </div>
                    <div className="font-bold text-white mb-1">{opt.title}</div>
                    <div className="text-xs text-brand-muted mb-4">{opt.desc}</div>
                    <div className="mt-auto">
                      <div className="text-lg font-heading text-white">{opt.price}</div>
                      {opt.subprice && <div className="text-[10px] text-brand-green font-bold">{opt.subprice}</div>}
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a 
                  href="https://wa.me/5566996280883"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                    <Headset className="text-brand-green" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-tight">Dúvidas?</p>
                    <p className="text-xs text-white font-medium group-hover:text-brand-green transition-colors">Fale com nosso suporte</p>
                  </div>
                </a>
                <div className="text-[10px] text-brand-muted italic">
                  🚀 Primezys — a melhor sala de sinais do Brasil.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                <button 
                  onClick={() => {
                    if (plan.isSpecial) {
                      setShowPlansModal(true);
                    } else if (plan.link) {
                      window.open(plan.link, '_blank');
                    }
                  }}
                  className={`w-full py-3 rounded text-sm font-bold transition-all ${plan.btnStyle}`}
                >
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
