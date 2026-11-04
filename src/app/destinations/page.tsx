import { DestinationList, type Destination } from "@/components/destinations/destination-list";

const DestinationsPage = async () => {
  const res = await fetch("http://localhost:8000/destinations");
  const data: Destination[] = await res.json();

  return (
    <main className="min-h-screen bg-white px-5 pt-10 pb-24 sm:px-10 sm:pt-14 lg:px-20">
      <div className="mx-auto max-w-[1420px]">
        <h1 className="text-4xl leading-none tracking-[-0.06em] text-black sm:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-zinc-500 sm:text-base">
          Find your perfect travel experience from our curated collection
        </p>

        <DestinationList destinations={data} />
      </div>
    </main>
  );
};

export default DestinationsPage;
