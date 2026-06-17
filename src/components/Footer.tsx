import { MessageCircle, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <section className="py-24 bg-brand-card border-y border-[rgba(57,255,20,0.2)] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading tracking-wider mb-8 uppercase">
            Ainda tem dúvidas? <span className="text-brand-green">Fale diretamente comigo!</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/5565999224222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-md font-bold text-lg hover:opacity-90 transition-opacity uppercase animate-pulse-shadow w-full sm:w-auto"
            >
              <MessageCircle fill="currentColor" />
              Falar no WhatsApp
            </a>

            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/trader_carlospatreze/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center text-white/50 hover:text-brand-green hover:bg-brand-green/10 transition-all border border-white/10 hover:border-brand-green/30"
                title="Siga no Instagram"
              >
                <Instagram size={28} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center text-white/50 hover:text-brand-green hover:bg-brand-green/10 transition-all border border-white/10 hover:border-brand-green/30"
                title="Inscreva-se no Youtube"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 border-t border-[rgba(57,255,20,0.1)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-brand-green font-heading text-3xl tracking-wider opacity-80 hover:opacity-100 transition-opacity">
            PATREZE
          </div>
          
          <div className="flex gap-6 text-sm text-brand-muted">
            <a href="#" className="hover:text-brand-green transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-brand-green transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-green transition-colors">LGPD</a>
          </div>
          
          <div className="text-xs text-brand-muted/50 text-center md:text-right max-w-xs">
            Aviso legal: "Resultados passados não garantem resultados futuros. Trade envolve riscos." <br/>
            &copy; {new Date().getFullYear()} Solyd. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
