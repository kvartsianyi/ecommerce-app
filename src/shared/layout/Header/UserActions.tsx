import { ShoppingCart } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { ProfileDropdown } from './ProfileDropDown';

type UserActionsProps = {
  count: number;
  onOpenCart: () => void;
  onLogout: () => void;
};

export function UserActions({ count, onOpenCart, onLogout }: UserActionsProps) {
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => onOpenCart() /* TODO: Redirect to /cart */}
      >
        <ShoppingCart className="size-4" />
        Кошик{count > 0 ? ` (${count})` : ''}
      </Button>

      <ProfileDropdown onLogout={onLogout} />
    </>
  );
}
