"use client";

import { useState, type FormEvent } from "react";
import { Loader2, PackageCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = "http://localhost:8000/add-destination";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const fieldClassName =
  "h-12 w-full rounded-none border-zinc-200 bg-slate-50 px-4 text-lg text-zinc-900 placeholder:text-zinc-500 focus-visible:border-cyan-600 focus-visible:ring-0 aria-invalid:border-red-500";

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    console.log(form)

    try {
      const token = await getTokenFromClient();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          resData?.message ?? `Request failed with status ${res.status}`
        );
      }

      console.log(resData);
      setStatus({
        type: "success",
        message: resData?.message ?? "Travel package added successfully.",
      });
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setStatus(null);
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-10 pb-14 sm:px-18 sm:pt-14">
      <div className="mx-auto max-w-[784px]">
        <h1 className="text-4xl tracking-[-0.06em] text-black sm:text-6xl">
          Add New Travel Package
        </h1>

        {status ? (
          <p
            className={`mt-8 border px-4 py-3 text-base ${
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
            role={status.type === "success" ? "status" : "alert"}
          >
            {status.message}
          </p>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className={`mx-auto ${
            status ? "mt-8 sm:mt-10" : "mt-12 sm:mt-20"
          } bg-white p-6 shadow-[0_3px_7px_rgb(0_0_0_/_0.18)] sm:p-10`}
        >
          <div className="grid gap-5">
            {/* Destination Name */}
            <div className="grid gap-2">
              <Label className="text-lg font-medium text-black" htmlFor="name">
                Destination Name
              </Label>
              <Input
                id="name"
                className={fieldClassName}
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                required
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label
                  className="text-lg font-medium text-black"
                  htmlFor="country"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  className={fieldClassName}
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-lg font-medium text-black">Category</Label>
                <Select
                  value={form.category || null}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger
                    className={`${fieldClassName} justify-between pr-4 data-[size=default]:h-12`}
                  >
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border border-zinc-200">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-lg font-medium text-black" htmlFor="price">
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  className={fieldClassName}
                  type="number"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) => update("price", event.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  className="text-lg font-medium text-black"
                  htmlFor="duration"
                >
                  Duration
                </Label>
                <Input
                  id="duration"
                  className={fieldClassName}
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) => update("duration", event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="grid gap-2">
              <Label
                className="text-lg font-medium text-black"
                htmlFor="departureDate"
              >
                Departure Date
              </Label>
              <Input
                id="departureDate"
                className={fieldClassName}
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  update("departureDate", event.target.value)
                }
                required
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label
                className="text-lg font-medium text-black"
                htmlFor="imageUrl"
              >
                Image URL
              </Label>
              <Input
                id="imageUrl"
                className={fieldClassName}
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label
                className="text-lg font-medium text-black"
                htmlFor="description"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                className={`${fieldClassName} h-36 resize-none py-3`}
                value={form.description}
                onChange={(event) =>
                  update("description", event.target.value)
                }
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-14 w-full rounded-none border border-red-400 bg-white px-6 text-base text-red-500 hover:bg-red-50 hover:text-red-500 sm:w-auto"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <Trash2 className="size-[17px]" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-14 w-full rounded-none bg-cyan-600 px-6 text-base text-white hover:bg-cyan-500 sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="size-[17px] animate-spin" />
              ) : (
                <PackageCheck className="size-[17px]" />
              )}
              {isSubmitting ? "Adding..." : "Add Travel Package"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
