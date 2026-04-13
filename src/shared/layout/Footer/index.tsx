import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '../Header/Logo';
import { ActionLink } from './ActionLink';
import { Separator } from '@/shared/ui/separator';
import { InfoCard } from './InfoCard';

export function Footer() {
  return (
    <footer className="section sm:px-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_1.85fr]">
        <div className="space-y-5 border-b border-card-border pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
          <Logo title="Замовляйте швидко, отримуйте гарячою" />
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Якщо потрібна допомога з замовленням, адресою або часом доставки,
            зв&apos;яжіться з нами напряму. Оператори відповідають протягом
            робочого дня.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <ActionLink href="tel:+380675551234" icon={Phone}>
              +380 67 555 12 34
            </ActionLink>
            <ActionLink href="mailto:hello@pizzahouse.ua" icon={Mail}>
              hello@pizzahouse.ua
            </ActionLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard icon={MapPin} label="Локація" title="Самовивіз і кухня">
            <p>вул. Пряма, 24</p>
            <p>Львів, Україна</p>
          </InfoCard>

          <InfoCard icon={Clock3} label="Графік" title="Працюємо щодня">
            <p>Пн - Чт: 10:00 - 22:00</p>
            <p>Пт - Нд: 10:00 - 23:00</p>
          </InfoCard>

          <InfoCard icon={Phone} label="Підтримка" title="Оператор на зв'язку">
            <p>Приймання замовлень до закриття кухні.</p>
            <p>Підтвердження доставки телефоном.</p>
          </InfoCard>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Pizza House. Всі права захищені.
      </div>
    </footer>
  );
}
