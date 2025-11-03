import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SignUp() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Зареєструватись</CardTitle>
        <CardDescription>
          Введіть ваш логін і пароль щоб увійти в акаунт
        </CardDescription>
        <CardAction>
          <Button variant="link" className="cursor-pointer">
            Увійти
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Ім'я</Label>
              <Input id="firstName" type="text" placeholder="Іван" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Прізвище</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Іваненко"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Емейл</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Зареєструватись
        </Button>
      </CardFooter>
    </Card>
  );
}
