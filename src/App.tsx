import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Learning from './components/Learning';
import SignalsRoom from './components/SignalsRoom';
import Differentials from './components/Differentials';
import Modules from './components/Modules';
import Results from './components/Results';
import About from './components/About';
import Team from './components/Team';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Learning />
        <SignalsRoom />
        <Differentials />
        <Modules />
        <Results />
        <About />
        <Team />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
