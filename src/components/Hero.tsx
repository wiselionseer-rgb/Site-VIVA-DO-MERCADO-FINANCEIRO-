import { useEffect, useRef, useState } from 'react';
import { Users, ShieldCheck, Target, Lock, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

function CanvasMarketBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;
    
    const candleWidth = 8;
    const spacing = 24;
    let candles: { x: number, open: number, close: number, high: number, low: number, isBull: boolean }[] = [];
    let activeCandle: { x: number, open: number, close: number, high: number, low: number, isBull: boolean } | null = null;
    let tickCounter = 0;

    const createCandle = (x: number, open: number) => {
      return { x, open, close: open, high: open, low: open, isBull: true };
    };

    const initCandles = () => {
      candles = [];
      const numCandles = Math.ceil(width / (candleWidth + spacing)) + 1;
      let currentX = 0;
      let currentClose = height * 0.6;
      
      for (let i = 0; i < numCandles; i++) {
        const c = createCandle(currentX, currentClose);
        const change = (Math.random() - 0.5) * (height * 0.1);
        c.close = currentClose + change;
        c.isBull = c.close <= c.open;
        c.high = Math.min(c.open, c.close) - Math.random() * (height * 0.05);
        c.low = Math.max(c.open, c.close) + Math.random() * (height * 0.05);
        
        candles.push(c);
        currentX += (candleWidth + spacing);
        currentClose = c.close;
      }
      activeCandle = candles[candles.length - 1];
    };

    const resize = () => {
      if (!canvasRef.current) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      initCandles();
    };

    let offset = 0;
    const scrollSpeed = 0.5;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      offset += scrollSpeed;
      
      if (activeCandle) {
        tickCounter++;
        if (tickCounter % 5 === 0) {
          const tickChange = (Math.random() - 0.5) * (height * 0.015);
          activeCandle.close += tickChange;
          
          if (activeCandle.close < height * 0.1) activeCandle.close = height * 0.1;
          if (activeCandle.close > height * 0.9) activeCandle.close = height * 0.9;

          activeCandle.high = Math.min(activeCandle.high, activeCandle.close);
          activeCandle.low = Math.max(activeCandle.low, activeCandle.close);
          activeCandle.isBull = activeCandle.close <= activeCandle.open;
        }

        if (offset >= candleWidth + spacing) {
          offset = 0;
          const newX = activeCandle.x + candleWidth + spacing;
          const newC = createCandle(newX, activeCandle.close);
          candles.push(newC);
          candles.shift();
          
          for(let i = 0; i < candles.length; i++) {
             candles[i].x -= (candleWidth + spacing);
          }
          activeCandle = candles[candles.length - 1];
        }
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 60) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
      for (let i = 0; i < width; i += 60) {
        const xPos = i - (offset % 60);
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }

      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const drawX = c.x - offset;
        
        const fillOpacity = i === candles.length - 1 ? 0.2 : 0.08;
        const strokeOpacity = i === candles.length - 1 ? 0.4 : 0.15;
        
        ctx.fillStyle = c.isBull ? `rgba(0, 255, 136, ${fillOpacity})` : `rgba(255, 68, 68, ${fillOpacity})`;
        ctx.strokeStyle = c.isBull ? `rgba(0, 255, 136, ${strokeOpacity})` : `rgba(255, 68, 68, ${strokeOpacity})`;
        
        ctx.beginPath();
        ctx.moveTo(drawX + candleWidth / 2, c.high);
        ctx.lineTo(drawX + candleWidth / 2, c.low);
        ctx.lineWidth = 1;
        ctx.stroke();

        const bodyY = Math.min(c.open, c.close);
        const bodyHeight = Math.max(Math.abs(c.close - c.open), 2);
        
        ctx.fillRect(drawX, bodyY, candleWidth, bodyHeight);
        ctx.strokeRect(drawX, bodyY, candleWidth, bodyHeight);
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" />;
}

export default function Hero() {
  const words = ['LIBERDADE', 'OPÇÕES', 'TRADING'];
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setCurrentWord(isDeleting ? fullText.substring(0, currentWord.length - 1) : fullText.substring(0, currentWord.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && currentWord === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="inicio" className="relative min-h-[100svh] flex flex-col pt-32 pb-16 overflow-hidden bg-brand-bg">
      <CanvasMarketBg />
      
      {/* Background Glows & Elements */}
      <div className="absolute top-1/2 right-[10%] lg:right-[20%] -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] rounded-full border border-brand-green/30 shadow-[0_0_150px_rgba(57,255,20,0.1)] pointer-events-none z-0 lg:flex items-center justify-center overflow-hidden bg-black opacity-30 sm:opacity-100">
        <img 
          src="./mentor-hero.png" 
          alt="Mentor" 
          className="w-full h-full object-cover object-center scale-[1.2] lg:scale-[1.1]"
        />
      </div>
      
      {/* 3D Arrow SVG */}
      <svg className="absolute -right-20 lg:right-0 top-[10%] w-[500px] h-[700px] pointer-events-none z-0 opacity-80" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 500 C 120 380, 250 200, 360 80" stroke="url(#paint0_linear)" strokeWidth="6" strokeLinecap="round" style={{filter: 'drop-shadow(0 0 25px #39FF14)'}} />
        <path d="M 320 80 L 365 72 L 355 120" stroke="#39FF14" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{filter: 'drop-shadow(0 0 25px #39FF14)'}} />
        <defs>
          <linearGradient id="paint0_linear" x1="50" y1="500" x2="360" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="transparent" />
            <stop offset="0.3" stopColor="#39FF14" stopOpacity="0.4" />
            <stop offset="1" stopColor="#39FF14" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full flex-grow mb-16">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-brand-green/50 shadow-[0_0_20px_rgba(57,255,20,0.3)] bg-brand-green/5 text-[#fff] text-xs font-bold uppercase tracking-wider mb-2">
            <Users size={14} className="mr-2 text-brand-green" />
            +100 alunos transformados
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-heading leading-[0.9] tracking-tight">
            VIVER DE <br/>
            <span className="text-brand-green">{currentWord}<span className="animate-pulse">|</span></span>
          </h1>
          
          <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white/80 uppercase mt-2 mb-4">
            Você no controle do seu tempo e do seu dinheiro.
          </div>

          <p className="text-lg text-brand-muted max-w-lg leading-relaxed">
            Construa sua liberdade financeira através da mentoria profissional com quem realmente vive do mercado de opções há mais de 5 anos.
          </p>

          <a href="#planos" className="mt-4 px-10 py-5 bg-brand-green text-[#050d05] rounded font-bold text-lg hover:bg-[#a3ff20] hover:scale-105 transition-all uppercase shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] animate-pulse-shadow">
            Quero Viver de Opções &rarr;
          </a>
            
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-8">
            <div className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="text-brand-green" size={24} />
              <span className="max-w-[100px] leading-tight">Estratégias Comprovadas</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-wider">
              <Target className="text-brand-green" size={24} />
              <span className="max-w-[100px] leading-tight">Foco em Resultados</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-wider">
              <Lock className="text-brand-green" size={24} />
              <span className="max-w-[100px] leading-tight">Suporte Exclusivo</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - 3D Phone Mockup & Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center sm:justify-end [perspective:1500px] lg:translate-x-32 xl:translate-x-40"
        >
          {/* Floating Badge */}
          <div className="absolute right-[20%] top-[40%] translate-x-32 bg-brand-card/80 backdrop-blur-md rounded-xl p-4 border border-brand-green/50 shadow-[0_0_30px_rgba(57,255,20,0.4)] z-30 animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-4xl font-heading text-brand-green tracking-wider">90%</div>
            <div className="text-[10px] text-white font-bold uppercase tracking-widest mt-1">De Acerto</div>
          </div>

          {/* Smartphone UI */}
          <div className="relative z-20 w-[280px] sm:w-[320px] h-[580px] rounded-[3rem] bg-[#050D05] border-[8px] border-[#131d16] p-5 shadow-[0_0_100px_rgba(57,255,20,0.3),inset_0_0_20px_rgba(57,255,20,0.1)] transform rotate-x-[15deg] rotate-y-[-20deg] rotate-z-[5deg] transition-transform duration-700 hover:rotate-x-[5deg] hover:rotate-y-[-10deg] flex flex-col animate-float">
            
            {/* Notch */}
            <div className="absolute top-0 inset-x-1/4 h-5 bg-[#131d16] rounded-b-xl z-30"></div>
            
            {/* Phone Header */}
            <div className="text-center mt-6 z-10 relative">
              <p className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Conta Real</p>
              <p className="text-3xl font-heading text-brand-green mt-1 tracking-wider drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">R$ 12.580,00</p>
              <div className="mt-3 bg-brand-green/10 border border-brand-green/20 rounded-md py-2 px-3 inline-block">
                <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Lucro do dia</p>
                <p className="text-xs text-brand-green font-bold">+R$ 3.240,00 (34,62%)</p>
              </div>
            </div>

            {/* Fake Chart Area inside Phone */}
            <div className="flex-grow mt-6 relative border-b border-white/5 flex items-end pb-2 gap-1.5 z-10 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 to-transparent"></div>
              {/* Fake Candles */}
              {[40, 60, 30, 80, 50, 90, 70, 110, 80, 140, 120, 160].map((h, i) => {
                const isBull = h > (i === 0 ? 30 : [40, 60, 30, 80, 50, 90, 70, 110, 80, 140, 120, 160][i-1]);
                return (
                  <div key={i} className="relative flex justify-center w-full z-10">
                    <div className={`absolute w-0.5 h-[140%] -top-[20%] ${isBull ? 'bg-brand-green' : 'bg-red-500'}`}></div>
                    <div style={{ height: `${h}px` }} className={`w-full rounded-sm ${isBull ? 'bg-brand-green' : 'bg-red-500'}`}></div>
                  </div>
                );
              })}
            </div>

            {/* WIN Pop-up */}
            <div className="absolute top-[45%] left-4 bg-[#0a180f] border border-brand-green/60 p-2 rounded shadow-[0_0_20px_rgba(57,255,20,0.3)] z-20 animate-float" style={{ animationDelay: '2s' }}>
              <p className="text-[10px] text-brand-green font-bold uppercase">WIN</p>
              <p className="text-xs text-white">+R$ 3.240,00</p>
            </div>

            {/* Buy/Sell Buttons */}
            <div className="flex gap-3 mt-6 z-10">
              <button className="flex-1 py-3 text-xs font-bold rounded bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider backdrop-blur-sm">
                Venda
              </button>
              <button className="flex-1 py-3 text-xs font-bold rounded bg-brand-green text-black uppercase tracking-wider shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:bg-[#a3ff20]">
                Compra
              </button>
            </div>

            {/* Footer Stats Row */}
            <div className="flex justify-between mt-4 text-center z-10 px-2">
              <div>
                <p className="text-[9px] text-gray-500 uppercase">Ativo</p>
                <p className="text-[11px] font-bold text-white mt-1">EUR/USD</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase">Expiração</p>
                <p className="text-[11px] font-bold text-white mt-1">5 min</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase">Valor</p>
                <p className="text-[11px] font-bold text-brand-green mt-1">R$ 500</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats Banner */}
      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-brand-card/60 backdrop-blur-xl border border-brand-green/30 rounded-2xl p-6 lg:p-8 shadow-[0_0_60px_rgba(57,255,20,0.1)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 border border-brand-green/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <Users className="text-brand-green" size={24} />
              </div>
              <div>
                <div className="text-3xl font-heading text-white tracking-wider">+100</div>
                <div className="text-[10px] text-brand-green font-bold uppercase tracking-widest leading-tight">Alunos<br/><span className="text-brand-muted">Transformados</span></div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 border border-brand-green/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <TrendingUp className="text-brand-green" size={24} />
              </div>
              <div>
                <div className="text-3xl font-heading text-white tracking-wider">+5 ANOS</div>
                <div className="text-[10px] text-brand-green font-bold uppercase tracking-widest leading-tight">Vivendo do <span className="text-brand-muted">Mercado de Opções</span></div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 border border-brand-green/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <Trophy className="text-brand-green" size={24} />
              </div>
              <div>
                <div className="text-3xl font-heading text-white tracking-wider">90%</div>
                <div className="text-[10px] text-brand-green font-bold uppercase tracking-widest leading-tight">De Acerto<br/><span className="text-brand-muted">Médio</span></div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 border border-brand-green/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <ShieldCheck className="text-brand-green" size={24} />
              </div>
              <div>
                <div className="text-3xl font-heading text-white tracking-wider">100%</div>
                <div className="text-[10px] text-brand-green font-bold uppercase tracking-widest leading-tight">Suporte<br/><span className="text-brand-muted">E Acompanhamento</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
