import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonNav() {
  return (
    <div className="flex items-center flex-wrap justify-center md:justify-start">
      {/* Skeleton para o breadcrumb */}
      <div className="hidden md:block mr-4 md:mr-[520px] mb-2">
        <Skeleton className="h-[40px] w-[180px] md:w-[220px] rounded-md" />
      </div>

      {/* Skeleton para o campo de pesquisa */}
      <div className="mr-4 mb-2">
        <Skeleton className="h-[40px] w-[211px] md:w-[336px] rounded-lg" />
      </div>

      {/* Skeleton para o botão de tema */}
      <div className="mr-4 mb-2">
        <Skeleton className="h-[40px] w-[40px] rounded-sm" />
      </div>

      {/* Skeleton para o avatar do usuário */}
      <div>
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
      </div>
    </div>
  );
}
