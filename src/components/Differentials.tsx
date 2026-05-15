import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { BookOpen, Users, HeadphonesIcon, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Differentials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    {
      icon: <BookOpen className="text-brand-green drop-shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-transform duration-500 group-hover:scale-110" size={48} />,
      title: "METODOLOGIA EXCLUSIVA",
      subtitle: "Do Zero à Consistência",
      desc: "Todas as aulas criadas com uma metodologia própria e avançada. Você vai aprender do absoluto zero avançando até as estratégias mais lucrativas e consistentes do mercado financeiro atual.",
      features: [
        "Aulas Diretas e Práticas",
        "Gestão de Risco Blindada",
        "Setup Exclusivo Primezys"
      ],
      colSpan: "lg:col-span-2",
      bgClass: "bg-gradient-to-br from-brand-card/80 to-black hover:from-brand-card hover:to-black/80"
    },
    {
      icon: <Users className="text-white transition-transform duration-500 group-hover:scale-110" size={48} />,
      title: "COMUNIDADE VIP",
      subtitle: "Networking e Crescimento",
      desc: "Faça parte de um ecossistema de vencedores. Compartilhe entradas, discuta estratégias e cresça junto com outros traders.",
      features: [
        "Ambiente de Alta Performance",
        "Troca de Experiências Diárias"
      ],
      colSpan: "lg:col-span-1",
      bgClass: "bg-brand-green text-black hover:bg-brand-green/90",
      textColor: "text-black",
      descColor: "text-black/80"
    },
    {
      icon: <ShieldCheck className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-transform duration-500 group-hover:scale-110" size={48} />,
      title: "SEGURANÇA E DISCIPLINA",
      subtitle: "Proteja seu Capital",
      desc: "Acreditamos que prosperidade caminha com responsabilidade. Ensinamos você a proteger seu capital antes de alavancá-lo, operando com inteligência e controle emocional.",
      features: [
        "Controle Emocional na Prática",
        "Blindagem de Capital",
        "Sem Falsas Promessas"
      ],
      colSpan: "lg:col-span-1",
      bgClass: "bg-gradient-to-br from-black to-brand-bg hover:from-brand-card/40 hover:to-brand-bg border border-sky-400/20"
    },
    {
      icon: <HeadphonesIcon className="text-brand-green drop-shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-transform duration-500 group-hover:scale-110" size={48} />,
      title: "SUPORTE PREMIUM",
      subtitle: "Você Nunca Estará Sozinho",
      desc: "Nossa equipe técnica e operacional está sempre a postos para garantir que você não tenha dúvidas na hora de apertar o botão.",
      features: [
        "Atendimento Rápido e Eficiente",
        "Resolução de Dúvidas Técnicas",
        "Equipe Altamente Qualificada"
      ],
      colSpan: "lg:col-span-2",
      bgClass: "bg-gradient-to-br from-[#0c1410] to-[#050806] hover:from-[#112017] hover:to-[#050806] border border-brand-green/20"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-64 w-96 h-96 bg-sky-400/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-end mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6">
              <TrendingUp size={14} className="text-brand-green" />
              <span className="text-xs font-bold tracking-widest text-brand-green uppercase">A Jornada do Sucesso</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading tracking-tight mb-6 leading-[1.1]">
              <span className="block text-white">O QUE NOS FAZ</span>
              <span className="block text-brand-green drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">DIFERENTES?</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 lg:max-w-md pb-4"
          >
            <p className="text-brand-muted text-lg leading-relaxed">
              Não entregamos apenas sinais. Nós formamos traders de verdade com uma <strong className="text-white font-medium">metodologia completa</strong>, suporte implacável e uma comunidade forte.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group flex flex-col p-10 rounded-3xl transition-all duration-500 overflow-hidden relative ${item.colSpan} ${item.bgClass}`}
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  {item.icon}
                </div>
                
                <h4 className={`text-sm tracking-widest font-bold uppercase mb-2 ${item.textColor ? 'text-black/60' : 'text-brand-muted'}`}>
                  {item.subtitle}
                </h4>
                <h3 className={`text-3xl font-heading tracking-wide mb-6 ${item.textColor || 'text-white'}`}>
                  {item.title}
                </h3>
                
                <p className={`text-lg leading-relaxed mb-8 flex-grow ${item.descColor || 'text-brand-muted'}`}>
                  {item.desc}
                </p>
                
                <ul className="space-y-4">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className={`${item.textColor ? 'text-black' : 'text-brand-green'}`} />
                      <span className={`font-medium ${item.textColor || 'text-white/90'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
