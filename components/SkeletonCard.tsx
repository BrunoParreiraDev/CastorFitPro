import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-[580px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
    </div>
  )
}
