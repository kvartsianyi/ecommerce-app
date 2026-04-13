import { Flame, Leaf, Pizza, Sparkles } from 'lucide-react';

export const CATEGORY_BADGE_CONFIG = {
  spicy: {
    label: 'Гостра',
    icon: Flame,
    className: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-200',
  },
  vegetarian: {
    label: 'Вегетаріанська',
    icon: Leaf,
    className:
      'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-200',
  },
  premium: {
    label: 'Преміум',
    icon: Sparkles,
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-200',
  },
  classic: {
    label: 'Класика',
    icon: Pizza,
    className: 'bg-muted text-foreground',
  },
} as const;
