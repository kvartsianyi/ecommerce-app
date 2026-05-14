import { useState } from 'react';
import {
  ChevronDown,
  Heart,
  LogOut,
  ReceiptText,
  UserRound,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { useAuth } from '@/features/auth/api/hooks/useAuth';

type ProfileDropdownProps = {
  onLogout: () => void;
};

export function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useAuth();
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';

  return (
    <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="outline">
          <UserRound className="size-4" />
          Профіль
          <ChevronDown
            className={`size-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="p-2"
          onClick={() => /* TODO: Redirect to profile page */ {}}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback className="bg-primary-foreground">
              {fullName.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{fullName}</span>
            <span className="text-muted-foreground">
              {user?.email ?? 'unknown'}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2">
          <ReceiptText className="size-4" />
          Замовлення
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2">
          <Heart className="size-4" />
          Улюблені
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="px-3 py-2"
          onClick={onLogout}
        >
          <LogOut className="size-4" />
          Вийти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
