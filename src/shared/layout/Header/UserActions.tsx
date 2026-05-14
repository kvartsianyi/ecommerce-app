import { ShoppingCart } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useCart } from '@/features/cart/api/hooks';
import { Spinner } from '@/shared/components/ui/spinner';
import { ProfileDropdown } from './ProfileDropdown';

type UserActionsProps = {
  count: number;
  onOpenCart: () => void;
  onLogout: () => void;
};

export function UserActions({ count, onOpenCart, onLogout }: UserActionsProps) {
  const { isPending } = useCart();

  const cartCountLabel = count > 0 ? ` (${count})` : '';

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => onOpenCart() /* TODO: Redirect to /cart */}
      >
        <ShoppingCart className="size-4" />
        Кошик{isPending ? <Spinner /> : cartCountLabel}
      </Button>

      <ProfileDropdown onLogout={onLogout} />
    </>
  );
}
