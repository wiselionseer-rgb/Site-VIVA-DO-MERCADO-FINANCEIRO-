import { useRef, MouseEvent, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Lock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  desc: string;
  locked: boolean;
  image?: string;
}

const CAROUSELS = [
  {
    title: "DISPONÍVEL GRATUITAMENTE",
    color: "text-brand-green",
    items: [
      { id: "M01", title: "Fundamentos do Mercado", desc: "A base para o sucesso.", locked: false, image: "/M01.png" },
      { id: "M02", title: "Introdução às Opções", desc: "Começando do zero.", locked: false, image: "/M02.jpg" },
      { id: "B01", title: "Configurando a Conta", desc: "Setup inicial corretora.", locked: false, image: "/B01_v2.png" },
      { id: "B02", title: "Psicologia Básica", desc: "Mindset trader.", locked: false, image: "/B02.jpg" },
      { id: "S01", title: "Sala de Sinais Primezys", desc: "80% de assertividade sem martingale.", locked: false, image: "/primezys-badge.jpg" },
    ]
  },
  {
    title: "MÉTODO RETRAÇÃO M1",
    color: "text-brand-gold",
    items: [
      { id: "M03", title: "Análise Técnica Avançada", desc: "Padrões gráficos.", locked: true, image: "/M03.jpg" },
      { id: "M04", title: "Gestão de Risco", desc: "Preserve seu capital.", locked: true, image: "/M04.jpg" },
      { id: "M05", title: "Operações no Mercado Real", desc: "Prática na conta real.", locked: true, image: "/M05.jpg" },
      { id: "M06", title: "Estratégias de Alta Precisão", desc: "Setups de 90% acerto.", locked: true, image: "/M06.jpg" },
      { id: "M07", title: "Filtros e Gatilhos", desc: "Aumentando assertividade.", locked: true, image: "/M07.jpg" },
    ]
  },
  {
    title: "MASTERCLASSES EXCLUSIVAS",
    color: "text-brand-orange",
    items: [
      { id: "MC01", title: "Masterclass Day Trade", desc: "Domine a volatilidade.", locked: true, image: "/MC01.jpg" },
      { id: "MC02", title: "Scalping M1 Pro", desc: "Agilidade no gráfico.", locked: true, image: "/MC02.jpg" },
      { id: "MC03", title: "Price Action Puro", desc: "A leitura do preço.", locked: true, image: "/MC03.jpg" },
      { id: "MC04", title: "Gatilhos de Entrada", desc: "Timing perfeito.", locked: true, image: "/MC04.jpg" },
    ]
  }
];

function CarouselLine({ data, onShowMessage }: { data: any, onShowMessage: () => void, key?: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDown(true);
    setDragged(false);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    setDragged(true);
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
        {data.items.map((item: ModuleItem, i: number) => (
          <div 
            key={i} 
            onClick={() => {
              if (!dragged) onShowMessage();
            }}
            className={`flex-none w-[240px] h-[340px] rounded-md relative overflow-hidden snap-start transition-transform duration-300 transform-gpu cursor-pointer
              ${item.locked ? 'filter grayscale brightness-50 hover:brightness-100 hover:scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:z-10'}
            `}
          >
            {item.image ? (
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
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
                <span className="text-brand-gold border border-brand-gold px-4 py-1.5 rounded text-xs font-bold hover:bg-brand-gold hover:text-black transition-colors pointer-events-auto">
                  Desbloquear &rarr;
                </span>
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
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <section id="modulos" className="py-24 bg-[#020502] relative border-t border-[rgba(57,255,20,0.1)]" ref={ref}>
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-8 left-1/2 z-[100] w-[90%] max-w-md bg-brand-card border border-brand-green/30 p-4 rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.2)] flex items-start gap-4"
          >
            <div className="bg-brand-green/20 p-2 rounded-full">
              <AlertCircle className="text-brand-green" size={24} />
            </div>
            <div>
              <h5 className="text-brand-green font-bold text-sm mb-1 uppercase tracking-wider">Acesso em Breve</h5>
              <p className="text-xs text-brand-muted leading-relaxed">
                Este módulo está em manutenção e será liberado em breve. Estamos preparando as melhores aulas para sua evolução!
              </p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-auto text-brand-muted hover:text-white"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
          <CarouselLine key={i} data={carousel} onShowMessage={() => setShowNotification(true)} />
        ))}
      </div>
    </section>
  );
}
