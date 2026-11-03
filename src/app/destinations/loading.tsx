import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading destinations"
      className="min-h-screen bg-white px-5 pt-10 pb-24 sm:px-10 sm:pt-14 lg:px-20"
      role="status"
    >
      <div className="mx-auto max-w-[1420px]">
        <Skeleton className="h-10 w-full max-w-md rounded-none sm:h-12" />
        <Skeleton className="mt-4 h-4 w-full max-w-sm rounded-none" />

        <div className="mt-10 grid border border-zinc-200 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              className="h-14 rounded-none border-b border-white bg-zinc-100 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
              key={index}
            />
          ))}
        </div>

        <Skeleton className="mt-4 h-4 w-36 rounded-none" />

        <div className="mt-7 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="aspect-[1.75/1] w-full rounded-none" />
              <Skeleton className="mt-4 h-3 w-24 rounded-none" />
              <div className="mt-3 flex items-center justify-between gap-6">
                <Skeleton className="h-6 w-36 rounded-none" />
                <Skeleton className="h-6 w-24 rounded-none" />
              </div>
              <Skeleton className="mt-3 h-3 w-28 rounded-none" />
              <Skeleton className="mt-5 h-4 w-20 rounded-none" />
            </div>
          ))}
        </div>
        <span className="sr-only">Loading destinations...</span>
      </div>
    </main>
  );
}
