"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

import type { Destination } from "@/components/destinations/destination-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export function DeleteDestinationDialog({
  destination,
  destinationId,
}: {
  destination: Destination;
  destinationId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isDeleting) {
      setOpen(nextOpen);
      if (nextOpen) setError(null);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const token = await getTokenFromClient();
      const response = await fetch(
        `http://localhost:8000/destinations/${destinationId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to delete the travel package.");
      }

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to delete the travel package."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={open}>
      <AlertDialogTrigger
        render={
          <Button
            className="h-10 rounded-none border-red-400 px-5 text-red-500 hover:bg-red-50 hover:text-red-500"
            variant="outline"
          />
        }
      >
        <X aria-hidden="true" size={15} />
        Cancel
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[calc(100%-2rem)] gap-0 rounded-none p-7 sm:max-w-[680px] sm:p-10">
        <AlertDialogCancel
          aria-label="Close delete confirmation"
          className="absolute top-4 right-4 size-8 rounded-none border-0 p-0 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          disabled={isDeleting}
          size="icon"
          variant="ghost"
        >
          <X aria-hidden="true" size={20} />
        </AlertDialogCancel>

        <AlertDialogHeader className="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_auto] items-center gap-x-5 gap-y-5 text-left">
          <AlertDialogMedia className="row-start-1 size-14 rounded-full bg-red-50 text-red-500 sm:row-span-1">
            <AlertTriangle aria-hidden="true" size={27} />
          </AlertDialogMedia>
          <AlertDialogTitle className="col-start-2 text-2xl font-normal tracking-[-0.04em] text-black">
            Delete Travel Package
          </AlertDialogTitle>
          <AlertDialogDescription className="col-span-2 text-left text-base leading-7 text-zinc-500">
            Are you sure you want to delete <strong className="font-semibold text-zinc-800">&quot;{destination.name}&quot;</strong>? This action cannot be undone and will permanently remove this travel package from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error ? (
          <p className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <AlertDialogFooter className="mx-0 mt-8 -mb-0 flex-col-reverse gap-3 rounded-none border-0 bg-transparent p-0 sm:flex-row sm:justify-end">
          <AlertDialogCancel
            className="h-12 w-full rounded-none border-zinc-200 px-7 text-zinc-600 sm:w-auto"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-12 w-full rounded-none bg-red-500 px-7 text-white hover:bg-red-600 sm:w-auto"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            ) : (
              <Trash2 aria-hidden="true" size={16} />
            )}
            {isDeleting ? "Deleting..." : "Delete Package"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
