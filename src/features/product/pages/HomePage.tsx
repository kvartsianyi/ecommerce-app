import { Hero, HotDeals, Menu } from '../components';

export function HomePage() {
  return (
    <>
      <section className="section">
        <Hero />
      </section>
      <section className="section border-t-0">
        <HotDeals />
      </section>
      {/* <Menu /> */}
    </>
  );
}
