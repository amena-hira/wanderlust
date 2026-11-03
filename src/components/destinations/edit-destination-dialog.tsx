"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Save, Trash2 } from "lucide-react";

import type { Destination } from "@/components/destinations/destination-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const fieldClassName =
  "h-11 w-full rounded-none border-zinc-200 bg-slate-50 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:border-cyan-600 focus-visible:ring-0";

function editableFields(destination: Destination) {
  return {
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: destination.price,
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  };
}

export function EditDestinationDialog({
  destination,
  destinationId,
}: {
  destination: Destination;
  destinationId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => editableFields(destination));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(editableFields(destination));
    setError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) resetForm();
    setOpen(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/destinations/${destinationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to update the travel package.");
      }

      setOpen(false);
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to update the travel package."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button className="h-10 rounded-none border-zinc-300 px-5" variant="outline" />
        }
      >
        <Pencil aria-hidden="true" size={14} />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] w-full gap-0 overflow-y-auto rounded-none p-0 sm:max-w-[680px]">
        <DialogHeader className="px-6 pt-6 pb-5 sm:px-8">
          <DialogTitle className="text-xl font-normal tracking-[-0.04em] text-black">
            Update Travel Package
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form className="px-6 pb-6 sm:px-8 sm:pb-8" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-medium text-black" htmlFor="edit-name">
                Destination Name
              </Label>
              <Input
                className={fieldClassName}
                id="edit-name"
                onChange={(event) => update("name", event.target.value)}
                required
                value={form.name}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-xs font-medium text-black" htmlFor="edit-country">
                  Country
                </Label>
                <Input
                  className={fieldClassName}
                  id="edit-country"
                  onChange={(event) => update("country", event.target.value)}
                  required
                  value={form.country}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-medium text-black">Category</Label>
                <Select
                  onValueChange={(value) => update("category", value ?? "")}
                  value={form.category || null}
                >
                  <SelectTrigger
                    className={`${fieldClassName} justify-between pr-3 data-[size=default]:h-11`}
                  >
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-xs font-medium text-black" htmlFor="edit-price">
                  Price (USD)
                </Label>
                <Input
                  className={fieldClassName}
                  id="edit-price"
                  min="0"
                  onChange={(event) => update("price", event.target.value)}
                  required
                  type="number"
                  value={form.price}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-medium text-black" htmlFor="edit-duration">
                  Duration
                </Label>
                <Input
                  className={fieldClassName}
                  id="edit-duration"
                  onChange={(event) => update("duration", event.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  required
                  value={form.duration}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-medium text-black" htmlFor="edit-date">
                Departure Date
              </Label>
              <Input
                className={fieldClassName}
                id="edit-date"
                onChange={(event) => update("departureDate", event.target.value)}
                required
                type="date"
                value={form.departureDate}
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-medium text-black" htmlFor="edit-image">
                Image URL
              </Label>
              <Input
                className={fieldClassName}
                id="edit-image"
                onChange={(event) => update("imageUrl", event.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                value={form.imageUrl}
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-medium text-black" htmlFor="edit-description">
                Description
              </Label>
              <Textarea
                className={`${fieldClassName} h-32 resize-none py-3`}
                id="edit-description"
                onChange={(event) => update("description", event.target.value)}
                required
                value={form.description}
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="h-11 w-full rounded-none border-red-400 px-5 text-red-500 hover:bg-red-50 hover:text-red-500 sm:w-auto"
              disabled={isSaving}
              onClick={() => handleOpenChange(false)}
              type="button"
              variant="outline"
            >
              <Trash2 aria-hidden="true" size={14} />
              Cancel
            </Button>
            <Button
              className="h-11 w-full rounded-none bg-cyan-600 px-5 text-white hover:bg-cyan-500 sm:w-auto"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? (
                <Loader2 aria-hidden="true" className="animate-spin" size={14} />
              ) : (
                <Save aria-hidden="true" size={14} />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
