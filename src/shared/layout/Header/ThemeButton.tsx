import { Moon, Sun } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useTheme } from '@/app/providers/theme/useTheme';

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10"
      aria-label={
        theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'
      }
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
