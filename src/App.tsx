import { useState } from 'react';
import { CircleUserRound, Funnel, ShoppingBasket } from 'lucide-react';

import Logo from './assets/logo.svg';
import ProductImage from './assets/product-photo.jpg';
import PizzaImage from './assets/pizza.png';

import { Button } from './components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from './components/ui/command';
import { Badge } from './components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ThemeProvider, useTheme } from './components/theme-provider';
import { Moon, Sun } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-8 gap-4 border-b">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Ecommerce Store Logo" className="h-12 w-auto" />
        <h2 className="text-3xl font-bold">Pizzi</h2>
        <span className="text-xl font-bold"> - зроблено з ❤️любов'ю</span>
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

export function Main() {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <main className="flex flex-1 gap-4 py-4">
      <div className="w-64">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Funnel />
            <span className="text-2xl font-bold">Фільтри</span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <span className="font-semibold py-2">Ціна</span>
            <span className="font-semibold">
              {priceRange[0]}грн - {priceRange[1]}грн
            </span>
            <Slider
              className="py-2"
              defaultValue={priceRange}
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={1}
            />
          </div>
        </div>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Піци</h2>
          <Select>
            <SelectTrigger className="w-[180px] data-[placeholder]:text-foreground">
              <SelectValue placeholder="Відсортувати" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="lowest_price">Від найнижчої</SelectItem>
                <SelectItem value="highest_price">Від найвищої</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Array.from({ length: 12 }).map(() => (
            <Card className="flex flex-col">
              <CardHeader>
                <img
                  className="rounded-lg"
                  src={PizzaImage}
                  alt="Product Image"
                />
                <CardTitle className="text-2xl">Піца</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p className="mb-4 text-base text-foreground">Ціна: 145грн</p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Doloremque accusantium tempora quasi facere vitae, nobis
                    maxime suscipit minima officia quaerat impedit quo inventore
                    sint quisquam aspernatur iste, enim alias ratione.
                  </p>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full cursor-pointer">Купити</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="py-4 border-t text-center">
      <p>&copy; 2025 Pizzi Website. All rights reserved.</p>
    </footer>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="container mx-auto flex flex-col min-h-screen">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
