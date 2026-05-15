import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    { type: 'video', src: '/social-proof/proof-1.mp4' },
    { type: 'image', src: '/social-proof/proof-2.jpg' },
    { type: 'image', src: '/social-proof/proof-3.jpg' },
    { type: 'video', src: '/social-proof/proof-4.mp4' },
    { type: 'video', src: '/social-proof/proof-5.mp4' }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.85 : 350 + 24; // item width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="depoimentos" className="py-24 bg-brand-bg2 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-heading tracking-wider uppercase">
            RESULTADOS DE <span className="text-brand-green">ALUNOS</span>
          </h2>
          <p className="text-brand-muted mt-4 text-lg">Histórias, depoimentos e prints reais da nossa comunidade</p>
        </motion.div>

        <div className="flex justify-end gap-4 mb-6 md:hidden">
          <button onClick={() => scroll('left')} className="p-3 rounded-full bg-brand-card border border-brand-green/20 text-brand-green active:bg-brand-green/20 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="p-3 rounded-full bg-brand-card border border-brand-green/20 text-brand-green active:bg-brand-green/20 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left')} 
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-3 rounded-full bg-brand-card/80 backdrop-blur border border-brand-green/30 text-brand-green hover:bg-brand-green/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="-mx-6 px-6 sm:mx-0 sm:px-0">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory items-center scroll-smooth hide-scrollbar"
            >
              {testimonials.map((test, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="shrink-0 w-[85vw] sm:w-[350px] snap-center rounded-2xl overflow-hidden bg-[#0A140A]/80 border border-[rgba(57,255,20,0.15)] flex flex-col justify-center max-h-[70vh] shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative"
                >
                  {test.type === 'video' ? (
                    <video 
                      src={test.src} 
                      className="w-full h-auto max-h-[70vh] object-cover sm:object-contain rounded-2xl" 
                      controls 
                      controlsList="nodownload"
                      playsInline 
                      preload="metadata"
                    />
                  ) : (
                    <img 
                      src={test.src} 
                      alt={`Depoimento de Aluno ${i + 1}`} 
                      className="w-full h-auto max-h-[70vh] object-contain rounded-2xl bg-black"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll('right')} 
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-3 rounded-full bg-brand-card/80 backdrop-blur border border-brand-green/30 text-brand-green hover:bg-brand-green/20 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
