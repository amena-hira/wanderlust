"use client"

import type { ReactNode } from "react"
import { ChevronDown, Save, Trash2 } from "lucide-react"

const inputClassName =
  "mt-2 h-12 w-full border border-zinc-200 bg-slate-50 px-4 text-lg text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-cyan-600"

export default function AddDestinationPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-14 pt-40 sm:px-18">
      <h1 className="text-4xl tracking-[-0.06em] text-black sm:text-6xl">
        Add New Travel Package
      </h1>

      <form
        className="mx-auto mt-20 max-w-[784px] bg-white p-10 shadow-[0_3px_7px_rgb(0_0_0_/_0.18)]"
        onSubmit={(event) => event.preventDefault()}
      >
        <FormField label="Destination Name">
          <input className={inputClassName} name="destinationName" placeholder="Bali Paradise" />
        </FormField>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField label="Country">
            <input className={inputClassName} name="country" placeholder="Indonesia" />
          </FormField>
          <FormField label="Category">
            <div className="relative">
              <select className={`${inputClassName} appearance-none`} defaultValue="Beach" name="category">
                <option>Beach</option>
                <option>Mountain</option>
                <option>City</option>
                <option>Adventure</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-6 -translate-y-1/2 text-zinc-400"
                size={20}
              />
            </div>
          </FormField>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField label="Price (USD)">
            <input className={inputClassName} inputMode="decimal" name="price" placeholder="e.g., 1299" />
          </FormField>
          <FormField label="Duration">
            <input className={inputClassName} name="duration" placeholder="e.g., 7 Days/6 Nights" />
          </FormField>
        </div>

        <FormField className="mt-5" label="Departure Date">
          <input className={inputClassName} name="departureDate" placeholder="mm/dd/yyyy" />
        </FormField>
        <FormField className="mt-5" label="Image URL">
          <input className={inputClassName} name="imageUrl" placeholder="https://example.com/image.jpg" type="url" />
        </FormField>
        <FormField className="mt-5" label="Description">
          <textarea
            className={`${inputClassName} h-36 resize-none py-3`}
            name="description"
            placeholder="Describe the travel experience..."
          />
        </FormField>

        <div className="mt-10 flex flex-wrap justify-end gap-4">
          <button className="inline-flex h-14 items-center gap-2 border border-red-400 px-6 text-red-500 transition-colors hover:bg-red-50" type="button">
            <Trash2 aria-hidden="true" size={17} />
            Cancel
          </button>
          <button className="inline-flex h-14 items-center gap-2 bg-cyan-600 px-6 text-white transition-colors hover:bg-cyan-500" type="submit">
            <Save aria-hidden="true" size={17} />
            Add Travel Package
          </button>
        </div>
      </form>
    </main>
  )
}

function FormField({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-lg font-medium text-black">{label}</span>
      {children}
    </label>
  )
}
