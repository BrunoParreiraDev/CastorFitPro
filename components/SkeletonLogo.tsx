import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLogo() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[40px] w-[40px] rounded-full" />
    </div>
  )
}
