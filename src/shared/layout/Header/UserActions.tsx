import { LogOut, ShoppingCart, User } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Badge } from '@/shared/ui/badge';

type UserActionsProps = {
  userName: string;
  count: number;
  onOpenCart: () => void;
  onLogout: () => void;
};

export function UserActions({
  userName,
  count,
  onOpenCart,
  onLogout,
}: UserActionsProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={onOpenCart}
      >
        <ShoppingCart />
        {count > 0 && (
          <Badge className="absolute -right-1 -top-1 size-5 flex items-center justify-center text-xs">
            {count}
          </Badge>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled>
            <span className="font-medium">{userName}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Вийти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
