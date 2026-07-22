import { useCallback } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Products from './components/Products';
import CoverStyles from './components/CoverStyles';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const scrollToPortfolio = useCallback(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero onExplore={scrollToPortfolio} />
        <Products />
        <CoverStyles />
        <Portfolio />
        <Services />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
