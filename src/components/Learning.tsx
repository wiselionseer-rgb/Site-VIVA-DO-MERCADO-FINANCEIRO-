import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Shield, Gift, Rocket, Flame, Lock, GraduationCap, PlayCircle, BarChart3, Users, CheckCircle2 } from 'lucide-react';

export default function Learning() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#020602] relative overflow-hidden flex flex-col items-center border-t border-[rgba(57,255,20,0.1)]" ref={ref}>
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none mix-blend-screen"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Background Animated Chart Arrows & Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex justify-between opacity-40 z-0">
        <div className="absolute top-20 -left-10 w-[30rem] h-[30rem] opacity-60 mix-blend-screen animate-float" style={{ animationDelay: '0s' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{filter: 'drop-shadow(0px 0px 20px #39FF14)'}}>
            <path d="M 20 150 L 60 90 L 100 120 L 150 40" fill="none" stroke="#39FF14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="142,40 158,40 150,30" fill="#39FF14" className="origin-center rotate-45" />
            
            {/* Faint Candlestick lines */}
            <rect x="58" y="100" width="4" height="20" fill="#39FF14" opacity="0.3" />
            <rect x="98" y="130" width="4" height="30" fill="#39FF14" opacity="0.3" />
            <rect x="148" y="50" width="4" height="40" fill="#39FF14" opacity="0.3" />
          </svg>
        </div>

        <div className="absolute top-40 -right-10 w-[36rem] h-[36rem] opacity-60 mix-blend-screen animate-float" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{filter: 'drop-shadow(0px 0px 20px #39FF14)'}}>
            <path d="M 50 160 L 90 110 L 120 130 L 170 50" fill="none" stroke="#39FF14" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="160,50 180,50 170,38" fill="#39FF14" className="origin-center rotate-45" />

            <rect x="88" y="120" width="4" height="20" fill="#39FF14" opacity="0.3" />
            <rect x="118" y="140" width="4" height="25" fill="#39FF14" opacity="0.3" />
            <rect x="168" y="60" width="4" height="35" fill="#39FF14" opacity="0.3" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10">
        
        {/* Main Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl sm:text-7xl md:text-[5.5rem] font-heading tracking-tight uppercase leading-[0.9] text-white">
            TRANSFORME <span className="text-white">CONHECIMENTO</span><br/>
            <span className="text-brand-green drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">EM LUCRO</span> TODOS OS DIAS.
          </h2>
          <p className="text-lg md:text-2xl text-white/90 mt-8 max-w-3xl mx-auto font-light leading-relaxed">
            Acesse conteúdos <span className="text-brand-green font-bold drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">100% GRATUITOS</span> e aprenda as estratégias
            que já transformaram a vida de mais de <span className="text-brand-green font-bold drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">100 alunos</span>.
          </p>
        </motion.div>

        {/* CTA Tri-Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative flex flex-col lg:flex-row items-center justify-between bg-[#030903]/80 backdrop-blur-md border border-[rgba(57,255,20,0.4)] rounded-2xl md:rounded-full p-2 md:p-3 shadow-[0_0_40px_rgba(57,255,20,0.15)]"
        >
          {/* Left Block */}
          <div className="flex-1 flex items-center justify-center lg:justify-start gap-4 p-4 pl-6 text-center lg:text-left w-full">
            <Gift size={36} className="text-brand-green shrink-0 drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]" />
            <div>
              <div className="font-heading tracking-widest text-base text-white">CONTEÚDOS 100% GRATUITOS</div>
              <div className="text-xs text-white/70 mt-0.5">Aprenda. Pratique. Evolua.</div>
            </div>
          </div>

          {/* Center Button */}
          <div className="w-full lg:w-auto -mx-2 lg:mx-0 my-4 lg:my-0 relative z-20 flex justify-center">
            <button className="w-[95%] lg:w-[420px] py-5 bg-brand-green hover:bg-[#a3ff20] text-black font-bold flex flex-col items-center rounded-xl md:rounded-full shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] transform hover:scale-105 transition-all animate-pulse-shadow cursor-pointer">
              <span className="text-3xl md:text-4xl font-heading tracking-widest uppercase text-black">COMECE AGORA</span>
              <span className="text-[10px] md:text-xs tracking-widest uppercase mt-1 font-extrabold flex items-center gap-1">
                E acesse todos os conteúdos gratuitos <span className="text-base font-bold">&gt;</span>
              </span>
            </button>
          </div>

          {/* Right Block */}
          <div className="flex-1 flex items-center justify-center lg:justify-end gap-4 p-4 pr-6 text-center lg:text-right w-full">
            <Rocket size={36} className="text-brand-green shrink-0 drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]" />
            <div className="flex flex-col lg:items-end">
              <div className="font-heading tracking-widest text-base text-white">COMECE HOJE MESMO</div>
              <div className="text-xs text-white/70 mt-0.5">Seu futuro começa agora!</div>
            </div>
          </div>
        </motion.div>

        {/* Divider Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-4 my-20"
        >
          <div className="h-px bg-[rgba(57,255,20,0.3)] w-12 md:w-32 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(57,255,20,1)]"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading tracking-widest uppercase text-white/90">
            O que você vai <span className="text-brand-green">aprender?</span>
          </h3>
          <div className="h-px bg-[rgba(57,255,20,0.3)] w-12 md:w-32 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(57,255,20,1)]"></div>
          </div>
        </motion.div>

        {/* 2 Big Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-[#030903]/80 backdrop-blur-sm border border-[rgba(57,255,20,0.2)] rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] hover:border-[rgba(57,255,20,0.5)] transition-all duration-300"
          >
            <div className="w-24 h-24 shrink-0 rounded-full bg-[#051505] border border-brand-green/50 flex items-center justify-center shadow-[inset_0_0_20px_rgba(57,255,20,0.2),0_0_20px_rgba(57,255,20,0.2)]">
              <Target size={44} className="text-brand-green drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-3xl font-heading tracking-wider text-white mb-4">OPERACIONAL</h4>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                Aprenda as estratégias de opções que os profissionais usam para lucrar todos os meses, independente da direção do mercado.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#030903]/80 backdrop-blur-sm border border-[rgba(57,255,20,0.2)] rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] hover:border-[rgba(57,255,20,0.5)] transition-all duration-300"
          >
            <div className="w-24 h-24 shrink-0 rounded-full bg-[#051505] border border-brand-green/50 flex items-center justify-center shadow-[inset_0_0_20px_rgba(57,255,20,0.2),0_0_20px_rgba(57,255,20,0.2)]">
              <Shield size={44} className="text-brand-green drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-3xl font-heading tracking-wider text-white mb-4">GERENCIAMENTO</h4>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                Controle de risco para nunca perder mais do que pode. Técnicas que os grandes fundos utilizam para preservar e multiplicar capital.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Orange CTA Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 bg-[#050D05]/90 backdrop-blur-md border border-[rgba(57,255,20,0.3)] hover:border-[rgba(57,255,20,0.5)] rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(57,255,20,0.05)] transition-all relative overflow-hidden"
        >
          {/* subtle glow inside */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff6b00]/10 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row relative z-10">
            <Flame size={64} className="text-[#ff6b00] shrink-0 drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]" />
            <div>
              <h4 className="text-2xl md:text-3xl font-heading tracking-wider text-white leading-tight">
                COMECE AGORA SEUS ESTUDOS E DÊ O PRIMEIRO PASSO
              </h4>
              <h4 className="text-2xl md:text-3xl font-heading tracking-wider text-[#ff6b00] mt-1 leading-tight drop-shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                RUMO À SUA LIBERDADE FINANCEIRA!
              </h4>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col items-center relative z-10 shrink-0">
            <button className="w-full lg:w-auto px-8 lg:px-12 py-5 bg-[#ff6b00] hover:bg-[#ff8c33] text-white font-heading text-xl md:text-2xl tracking-widest rounded-xl md:rounded-2xl uppercase transition-all shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_50px_rgba(255,107,0,0.6)] hover:scale-105 flex items-center justify-center gap-3 cursor-pointer">
              QUERO COMEÇAR AGORA <span className="text-2xl font-bold">&rarr;</span>
            </button>
            <div className="flex items-center justify-center gap-2 mt-5 text-white/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              <Lock size={14} /> ACESSO IMEDIATO E 100% GRATUITO
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 border-t border-[rgba(57,255,20,0.2)] pt-12 pb-6 flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4"
        >
          {[
            { icon: GraduationCap, text1: "CONTEÚDOS", text2: "100% GRATUITOS" },
            { icon: PlayCircle, text1: "AULAS PRÁTICAS", text2: "E DIRETAS AO PONTO" },
            { icon: BarChart3, text1: "ESTRATÉGIAS", text2: "COMPROVADAS" },
            { icon: Users, text1: "COMUNIDADE", text2: "ATIVA" },
            { icon: CheckCircle2, text1: "FOCO NO QUE", text2: "REALMENTE FUNCIONA" }
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 hover:scale-105 transition-transform cursor-default px-2">
              <f.icon size={32} className="text-brand-green shrink-0 drop-shadow-[0_0_10px_rgba(57,255,20,0.4)]" />
              <div className="text-[10px] sm:text-xs leading-snug font-bold text-white/50 uppercase tracking-[0.15em]">
                <span>{f.text1}</span><br/><span className="text-white drop-shadow-sm">{f.text2}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
