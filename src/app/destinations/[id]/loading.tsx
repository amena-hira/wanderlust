import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetailsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading destination details"
      className="min-h-screen bg-white px-5 pt-6 pb-24 sm:px-10 sm:pt-8 lg:px-20"
      role="status"
    >
      <div className="mx-auto max-w-[1420px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-4 w-40 rounded-none" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24 rounded-none" />
            <Skeleton className="h-10 w-28 rounded-none" />
          </div>
        </div>

        <Skeleton className="mt-6 h-56 w-full rounded-none sm:h-auto sm:aspect-[2.45/1]" />

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0">
            <Skeleton className="h-4 w-24 rounded-none" />
            <Skeleton className="mt-4 h-11 w-full max-w-sm rounded-none" />
            <div className="mt-5 flex gap-5">
              <Skeleton className="h-4 w-32 rounded-none" />
              <Skeleton className="h-4 w-36 rounded-none" />
            </div>

            <Skeleton className="mt-14 h-7 w-28 rounded-none" />
            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-11/12 rounded-none" />
            </div>

            <Skeleton className="mt-12 h-7 w-28 rounded-none" />
            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-4/5 rounded-none" />
            </div>
            <div className="mt-7 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton className="h-4 w-full max-w-56 rounded-none" key={index} />
              ))}
            </div>
          </div>

          <div className="min-w-0 border border-zinc-200 p-6 shadow-[0_4px_18px_rgb(0_0_0_/_0.06)]">
            <Skeleton className="h-4 w-24 rounded-none" />
            <Skeleton className="mt-3 h-10 w-32 rounded-none" />
            <Skeleton className="mt-3 h-3 w-20 rounded-none" />
            <Skeleton className="mt-8 h-13 w-full rounded-none" />
            <Skeleton className="mt-6 h-13 w-full rounded-none bg-cyan-200" />
            <div className="mt-6 space-y-4 border-t border-zinc-100 pt-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-4 w-full rounded-none" key={index} />
              ))}
            </div>
          </div>
        </div>
        <span className="sr-only">Loading destination details...</span>
      </div>
    </main>
  );
}
