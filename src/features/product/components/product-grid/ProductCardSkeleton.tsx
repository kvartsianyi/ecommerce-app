import { Card, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col py-0">
      <div className="aspect-[4/3]">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="flex-1 space-y-3">
        <div className="flex items-center items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2 mb-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </CardHeader>

      <CardFooter className="px-5 py-4 flex items-center justify-between gap-3 border-t">
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-12 w-28" />
      </CardFooter>
    </Card>
  );
}
