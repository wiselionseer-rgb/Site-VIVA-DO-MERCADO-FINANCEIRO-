import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, Target, Shield, Zap } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const floatingTags = [
    { icon: <TrendingUp size={14} />, text: "Consistência", top: "15%", left: "-10%", delay: 0 },
    { icon: <Target size={14} />, text: "90% Assertividade", top: "45%", right: "-12%", delay: 1 },
    { icon: <Shield size={14} />, text: "Gestão Blindada", bottom: "10%", left: "-5%", delay: 2 },
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="sobre" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Image Side with Neon and Popups */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md lg:w-1/2"
          >
            {/* Neon Glow Aura */}
            <div className="absolute inset-0 bg-brand-green/20 blur-[100px] rounded-3xl animate-pulse pointer-events-none" />
            
            {/* Main Image Container */}
            <div className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-brand-green/30 group">
              {/* Inner Glow Overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-brand-green/50 z-20 pointer-events-none" />
              
              <img 
                src="/carlos-patreze.jpg" 
                alt="Carlos Patreze" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-15" />
              
              <div className="absolute bottom-8 left-8 z-20">
                <div className="text-3xl font-heading tracking-wider mb-1 text-white">CARLOS PATREZE</div>
                <div className="text-brand-green font-bold text-sm tracking-[0.3em] uppercase drop-shadow-md">+10 ANOS DE EXPERIÊNCIA</div>
              </div>
            </div>

            {/* Floating Popups */}
            {floatingTags.map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  delay: 1 + tag.delay * 0.2, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
                className="absolute z-30 hidden md:flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-brand-green/30 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <div className="text-brand-green">{tag.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">{tag.text}</span>
              </motion.div>
            ))}

            {/* Neon Frame Accent */}
            <div className="absolute -inset-4 border border-brand-green/10 rounded-[3rem] pointer-events-none blur-sm" />
          </motion.div>

          {/* Content Side */}
          <div className="flex-1 w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-brand-green fill-brand-green" size={20} />
                <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs">A Mente por trás da Estratégia</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading tracking-tight text-white mb-8">
                SOBRE <span className="text-brand-green">CARLOS PATREZE</span>
              </h2>
              
              <div className="space-y-6 text-brand-text/70 text-lg leading-relaxed font-light">
                <p>
                  Mais que um trader: um mentor focado em resultados. Com mais de <strong className="text-white font-medium">10 anos de experiência</strong> atuando no mercado de ações e opções, descobri o que realmente separa os perdedores dos vencedores.
                </p>
                <p>
                  Após alcançar a consistência e a liberdade financeira, desenvolvi uma <strong className="text-brand-green font-medium">metodologia validada com quase 90% de assertividade</strong>. Não se trata de sorte, mas de estratégia, gestão de risco blindada e disciplina operacional.
                </p>
                <p>
                  Se o seu maior sonho é <strong className="text-white font-medium">viver exclusivamente do mercado financeiro</strong>, sem as ilusões e falsas promessas encontradas por aí, meu objetivo é te guiar. Construímos a <em>Primezys Investimentos</em> para ser o seu último passo antes da sua independência financeira.
                </p>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 }}
                  className="border-l-4 border-brand-green pl-6 py-2 bg-brand-green/5 rounded-r-xl"
                >
                  <p className="italic text-white/90">
                    "Minha missão é transformar iniciantes em traders profissionais, capazes de extrair dinheiro do mercado de forma consistente, com inteligência e controle emocional."
                  </p>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-heading text-brand-green mb-1">90%</div>
                  <div className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-tight">Taxa de Acerto Médio</div>
                </div>
                <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-white/10 py-4 sm:py-0 sm:px-6">
                  <div className="text-4xl font-heading text-white mb-1">+150</div>
                  <div className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-tight">Alunos Transformados</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-heading text-white mb-1">+5</div>
                  <div className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-tight">Anos como Mentor</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
