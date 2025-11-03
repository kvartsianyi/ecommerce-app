import {
  Pizza,
  Sun,
  Moon,
  ShoppingBasket,
  CircleUserRound,
} from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { Button } from '../ui/button';
import { Command, CommandInput } from '../ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

export function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-8 gap-4 border-b">
      <div className="flex items-center gap-4">
        {/* <img src={Logo} alt="Ecommerce Store Logo" className="h-12 w-auto" />
         */}
        <Pizza className="h-12 w-auto" />
        <h2 className="text-3xl font-bold">
          <span className="text-primary">Easy Pizza</span>
          <span className="text-xl font-bold"> - зроблено з ❤️любов'ю</span>
        </h2>
      </div>
      <Command className="flex-1 rounded-lg border max-w-xl">
        <CommandInput placeholder="Пошук..." />
      </Command>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer"
          >
            <ShoppingBasket className="size-6" />
            <Badge className="font-mono tabular-nums font-bold absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1">
              1
            </Badge>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <CircleUserRound className="size-6" />
        </Button>
      </div>
    </header>
  );
}
