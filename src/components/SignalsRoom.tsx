import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, Target, LineChart, Share2, ChevronRight, Zap, Headset } from 'lucide-react';

export default function SignalsRoom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden flex flex-col items-center border-y border-[rgba(57,255,20,0.1)]" id="sala-de-sinais" ref={ref}>
      {/* Overlay Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-green/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-20">
          
          {/* Content Right (Was Left) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[40%] text-left xl:pl-10 shrink-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
              SALA VIP
            </div>
            
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-heading tracking-tight uppercase leading-[0.9] text-white mb-8">
              SUA CONSISTÊNCIA OU<br/>
              <span className="text-brand-green drop-shadow-[0_0_30px_rgba(57,255,20,0.4)]">SEU DINHEIRO DE VOLTA</span>
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed font-light mb-10 max-w-2xl">
              <p>
                <strong className="text-white font-bold">Primezys Investimentos</strong> nasceu com o propósito de gerar liberdade financeira através da tecnologia, análises gráficas e automatizações aplicadas ao mercado financeiro.
              </p>
              <p>
                Inspirados em Lucas 19:12-26 — <em className="text-brand-green mx-1 font-medium italic">“Negociai até que eu volte”</em> — acreditamos que prosperidade deve caminhar junto com propósito, disciplina e responsabilidade.
              </p>
              <p>
                Nosso objetivo é servir o Reino, servindo pessoas, auxiliando traders a operarem com mais estratégia, consistência e inteligência.
              </p>
            </div>

            <div className="mb-8 p-3 rounded-xl bg-brand-bg2 border border-[rgba(57,255,20,0.1)] inline-flex items-center gap-3">
              <ShieldCheck size={18} className="text-brand-green" />
              <span className="text-white/80 text-sm font-medium">GARANTIA INCONDICIONAL DE 30 DIAS</span>
            </div>
            
            <div className="text-base md:text-lg text-white/80 leading-relaxed font-light mb-10 max-w-2xl space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-[40px] rounded-full" />
                <p className="text-white font-medium text-lg leading-relaxed relative z-10 italic">
                  "Se você não tiver <span className="text-brand-green font-bold uppercase not-italic">consistência em 30 dias</span> em nossa sala, devolvemos totalmente seu dinheiro."
                </p>
              </div>
              <p>
                Nós confiamos tanto no nosso método que o risco é todo nosso. Para validar a sua garantia, você só precisa seguir <strong>3 regras simples</strong>:
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {[
                { icon: Target, text: "Fazer o nosso método rigorosamente à risca" },
                { icon: Share2, text: "Compartilhar todas as suas entradas" },
                { icon: LineChart, text: "Seguir o gerenciamento de 30 dias sem desvios" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg2 border border-brand-green/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(57,255,20,0.15)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-green/20 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                    <item.icon size={20} className="text-brand-green relative z-10" />
                  </div>
                  <span className="text-white text-base font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button className="w-full sm:w-auto px-10 py-5 bg-brand-green hover:bg-[#a3ff20] text-black font-heading text-xl md:text-2xl tracking-widest rounded-2xl shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] transform hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer group">
              ACEITAR O DESAFIO <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Asset/Visual Left (Was Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative perspective-1000 flex justify-center lg:justify-start"
          >
            <div className="relative z-10 w-full max-w-[850px] shadow-[0_0_100px_rgba(56,189,248,0.2)] group rounded-[2.5rem] overflow-hidden mx-auto lg:mx-0 bg-black border border-sky-400/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-square object-cover block transform transition-transform duration-700 group-hover:scale-[1.02]"
              >
                <source src="/signals_h264.mp4" type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-1.5 sm:gap-2 z-10 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-brand-green/20 backdrop-blur-md scale-90 sm:scale-100 origin-top-left">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" />
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-white uppercase">SALA VIP DE SINAIS</span>
              </div>

              {/* Floating Badge 1 - 80% Assertividade */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 sm:top-8 right-4 sm:right-6 z-20 flex items-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-brand-green/40 shadow-[0_0_20px_rgba(57,255,20,0.25)] scale-90 sm:scale-100 origin-top-right"
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center shrink-0">
                  <Zap size={16} className="text-brand-green sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-widest text-brand-muted font-bold">Taxa de Acerto</div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">80% de Assertividade</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Suporte */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 right-4 sm:right-6 z-20 flex items-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-blue-400/40 shadow-[0_0_20px_rgba(96,165,250,0.25)] scale-90 sm:scale-100 origin-bottom-right sm:origin-right"
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-blue-400/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                  <Headset size={16} className="text-blue-400 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-widest text-brand-muted font-bold">Suporte Primezys</div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Atendimento até 23h</div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-400/20 blur-[60px] rounded-full z-0" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-400/10 blur-[60px] rounded-full z-0" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
