import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-brand-bg via-[#0a2e15] to-brand-bg text-center py-1 text-xs sm:text-sm font-medium tracking-wide border-b border-brand-green/20">
        <div className="flex items-center justify-center gap-2">
          <Zap size={14} className="text-brand-green fill-brand-green" />
          <span><strong className="text-brand-green">+100 alunos</strong> transformados | Vagas limitadas para a próxima turma</span>
        </div>
      </div>
      <nav
        className={`fixed top-6 sm:top-7 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050d05]/95 backdrop-blur-[20px] border-b border-[rgba(0,255,136,0.12)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="text-brand-green font-heading text-3xl tracking-wider">
            PATREZE
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <div className="relative group">
              <a href="#inicio" className="text-brand-green transition-colors">Início</a>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-green rounded-full shadow-[0_0_12px_rgba(57,255,20,0.8)]"></div>
            </div>
            <a href="#modulos" className="text-brand-text hover:text-brand-green transition-colors">Módulos</a>
            <a href="#sobre" className="text-brand-text hover:text-brand-green transition-colors">Sobre</a>
            <a href="#depoimentos" className="text-brand-text hover:text-brand-green transition-colors">Depoimentos</a>
          </div>

          <a 
            href="#planos"
            className="px-6 py-2.5 bg-brand-green text-[#050d05] rounded-md font-bold text-sm hover:bg-[#a3ff20] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition-all whitespace-nowrap"
          >
            Quero Viver de Opções
          </a>
        </div>
      </nav>
    </>
  );
}
