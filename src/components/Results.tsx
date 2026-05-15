import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, animate } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

function AnimatedCounter({ end, prefix = '', suffix = '', currency = false, isVisible }: { end: number, prefix?: string, suffix?: string, currency?: boolean, isVisible: boolean }) {
  const count = useSpring(0, {
    mass: 1,
    tension: 50,
    friction: 25,
  });
  
  const displayCount = useTransform(count, (latest) => {
    const val = Math.floor(latest);
    if (currency) {
      return val.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return val;
  });

  useEffect(() => {
    if (isVisible) {
      count.set(end);
    }
  }, [isVisible, end, count]);

  return (
    <motion.span>
      {prefix}
      <motion.span>{displayCount}</motion.span>
      {suffix}
    </motion.span>
  );
}

export default function Results() {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { label: "GERADO PELOS ALUNOS", end: 452563, prefix: "R$ ", currency: true },
    { label: "ESTRATÉGIAS ENSINADAS", end: 23 },
    { label: "RETORNO MÉDIO (MÊS)", end: 14, suffix: "% a 50%" }
  ];

  const [proofs, setProofs] = useState<string[]>([
    "proof-1.mp4",
    "proof-2.jpg",
    "proof-3.jpg",
    "proof-4.mp4",
    "proof-5.mp4"
  ]);

  useEffect(() => {
    // Shuffle proofs on mount
    setProofs(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 240 + 24; // Card width + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-brand-bg relative" ref={ref} id="resultados">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Provas Sociais</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading tracking-wider text-white">
            RESULTADOS <span className="text-brand-green">REAIS</span>
          </h2>
          <p className="text-brand-muted mt-4 text-lg max-w-2xl mx-auto">
            Veja o que é possível conquistar transformando sua vida e utilizando nossas estratégias, resultados dos alunos da Primezys.
          </p>
        </motion.div>

        <div className="relative mb-20 group">
          {/* Scroll Buttons (Desktop) */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md hidden md:flex items-center justify-center hover:bg-brand-green hover:text-black hover:border-brand-green transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md hidden md:flex items-center justify-center hover:bg-brand-green hover:text-black hover:border-brand-green transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-4 sm:px-6"
          >
            {proofs.map((proof, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-[180px] sm:w-[220px] md:w-[260px] flex-none aspect-[9/16] snap-center rounded-2xl overflow-hidden border border-brand-green/20 relative bg-brand-card shadow-[0_10px_30px_rgba(57,255,20,0.1)] hover:border-brand-green/60 transition-all duration-300 group/card"
              >
                {proof.endsWith('.mp4') ? (
                  <video 
                    src={`/social-proof/${proof}`}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img 
                    src={`/social-proof/${proof}`}
                    alt="Prova social"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.2) }}
              className="bg-brand-card border border-[rgba(57,255,20,0.1)] rounded-2xl p-8 text-center flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="text-4xl sm:text-5xl font-heading text-brand-green mb-3 tracking-tight drop-shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} currency={stat.currency} isVisible={isInView} />
              </div>
              <div className="text-sm text-brand-muted uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
