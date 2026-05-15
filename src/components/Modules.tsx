import { useRef, MouseEvent, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  desc: string;
  locked: boolean;
}

const CAROUSELS = [
  {
    title: "DISPONÍVEL GRATUITAMENTE",
    color: "text-brand-green",
    items: [
      { id: "M01", title: "Fundamentos do Mercado", desc: "A base para o sucesso.", locked: false },
      { id: "M02", title: "Introdução às Opções", desc: "Começando do zero.", locked: false },
      { id: "B01", title: "Configurando a Conta", desc: "Setup inicial corretora.", locked: false },
      { id: "B02", title: "Psicologia Básica", desc: "Mindset trader.", locked: false },
    ]
  },
  {
    title: "MÉTODO RETRAÇÃO M1",
    color: "text-brand-gold",
    items: [
      { id: "M03", title: "Análise Técnica Avançada", desc: "Padrões gráficos.", locked: true },
      { id: "M04", title: "Gestão de Risco", desc: "Preserve seu capital.", locked: true },
      { id: "M05", title: "Operações no Mercado Real", desc: "Prática na conta real.", locked: true },
      { id: "M06", title: "Estratégias de Alta Precisão", desc: "Setups de 90% acerto.", locked: true },
      { id: "M07", title: "Filtros e Gatilhos", desc: "Aumentando assertividade.", locked: true },
    ]
  },
  {
    title: "MASTERCLASSES EXCLUSIVAS",
    color: "text-brand-orange",
    items: [
      { id: "MC01", title: "Masterclass Forex", desc: "Expansão de mercado.", locked: true },
      { id: "MC02", title: "Crypto E DeFi", desc: "Nova fronteira.", locked: true },
      { id: "MC03", title: "Day Trade Avançado", desc: "Técnicas institucionais.", locked: true },
      { id: "MC04", title: "Imposto de Renda", desc: "Regularização de lucros.", locked: true },
    ]
  }
];

function CarouselLine({ data }: { data: any, key?: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollAction = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 256;
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className="mb-12 relative group">
      <h3 className={`text-lg font-bold mb-4 font-heading tracking-widest px-6 lg:px-12 ${data.color}`}>
        {data.title}
      </h3>
      
      <button 
        onClick={() => scrollAction('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80 lg:translate-x-0 hidden md:flex"
      >
        <ChevronLeft size={32} />
      </button>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 lg:px-12 pb-8 cursor-grab active:cursor-grabbing"
      >
        {data.items.map((item, i) => (
          <div 
            key={i} 
            className={`flex-none w-[240px] h-[340px] rounded-md relative overflow-hidden snap-start transition-transform duration-300 transform-gpu
              ${item.locked ? 'filter grayscale brightness-50 hover:brightness-100 hover:scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:z-10'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-bg/80 to-brand-card/50" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
            
            <div className="absolute top-2 right-2 text-6xl font-heading opacity-10 text-brand-green pointer-events-none select-none">
              {item.id}
            </div>

            {!item.locked && (
              <div className="absolute top-3 left-3 bg-brand-green text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
                GRÁTIS
              </div>
            )}

            {item.locked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/80 z-20">
                <Lock className="text-brand-gold mb-2" size={32} />
                <span className="text-sm font-bold text-white mb-4">Conteúdo Exclusivo</span>
                <a href="#planos" className="text-brand-gold border border-brand-gold px-4 py-1.5 rounded text-xs font-bold hover:bg-brand-gold hover:text-black transition-colors pointer-events-auto">
                  Desbloquear &rarr;
                </a>
              </div>
            )}

            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h4 className="font-bold text-sm leading-tight mb-1">{item.title}</h4>
              <p className="text-[11px] text-brand-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => scrollAction('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80 hidden md:flex"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

export default function Modules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="modulos" className="py-24 bg-[#020502] relative border-t border-[rgba(57,255,20,0.1)]" ref={ref}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="mb-12 px-6 lg:px-12"
      >
        <h2 className="text-4xl sm:text-5xl font-heading tracking-wider uppercase">
          BIBLIOTECA DE <span className="text-brand-green">CONTEÚDO</span>
        </h2>
        <p className="text-brand-muted mt-2 text-lg">Comece grátis. Desbloqueie o restante com seu plano.</p>
      </motion.div>

      <div className="relative">
        {CAROUSELS.map((carousel, i) => (
          <CarouselLine key={i} data={carousel} />
        ))}
      </div>
    </section>
  );
}
