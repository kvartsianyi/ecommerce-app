import { Hero, HotDeals, Menu } from '../components';

export function HomePage() {
  return (
    <>
      <section className="section border-b-0">
        <Hero />
      </section>
      <section className="section">
        <HotDeals />
      </section>
      <section id="menu" className="section border-t-0">
        <Menu />
      </section>
    </>
  );
}
