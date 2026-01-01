export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Про нас</h3>
            <p className="text-sm text-muted-foreground">
              Найсмачніша піца в місті. Готуємо з любов'ю та використовуємо
              тільки свіжі інгредієнти.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакти</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Телефон: +380 (XX) XXX-XX-XX</li>
              <li>Email: info@pizza.ua</li>
              <li>Адреса: м. Київ, вул. Хрещатик, 1</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Графік роботи</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Пн-Пт: 10:00 - 22:00</li>
              <li>Сб-Нд: 11:00 - 23:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Піца-Доставка. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}
