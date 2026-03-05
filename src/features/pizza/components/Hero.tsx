export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-32">
      <div className="absolute inset-0 z-0">
        <img
          src="/delicious-fresh-pizza-with-melted-cheese-and-toppi.jpg"
          alt="pizza"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Найсмачніша піца в місті
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-white/80 md:text-xl">
            Свіжі інгредієнти, оригінальні рецепти та швидка доставка прямо до
            ваших дверей
          </p>
          <div className="mt-10">
            <a href="#menu">
              <button className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                Переглянути меню
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
