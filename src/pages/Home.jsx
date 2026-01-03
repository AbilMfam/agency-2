import { Hero, Clients, Stats, WhyChooseUs, Portfolio, Process, Testimonials, CTA } from '../components/home';
import { Newsletter } from '../components/ui';

const Home = () => {
  return (
    <>
      <Hero />
      <Clients />
      <Stats />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <div className="container-custom mx-auto px-4 md:px-8 py-16">
        <Newsletter />
      </div>
      <CTA />
    </>
  );
};

export default Home;
