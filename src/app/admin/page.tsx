
"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Save, Trash } from "lucide-react";

const categoryOptions = ["Beach", "Mountain", "Adventure", "Desert"];

const emptyForm = {
    destinationName: "",
    country: "",
    category: categoryOptions[0],
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const inputClass =
    "block h-10 w-full rounded-md border-transparent bg-neutral-100 px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-brand focus:bg-white";

const labelClass = "mb-1.5 block text-[13px] font-medium text-neutral-900";

export default function AdminPage() {
    const [form, setForm] = useState(emptyForm);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field: keyof typeof emptyForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setSubmitted(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch('http://localhost:5001/add-destination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        })


        if (res.ok) {
            setSubmitted(true);
            setForm(emptyForm);
        }

    };

    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page heading */}
                <header className="mb-8">
                    <h1 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
                        Add New Travel Package
                    </h1>
                </header>

                {/* Form card */}
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto w-full max-w-3xl border border-border bg-white p-6 sm:p-8"
                >
                    <div className="space-y-5">
                        {/* Destination name */}
                        <label className="block">
                            <span className={labelClass}>Destination Name</span>
                            <input
                                type="text"
                                required
                                value={form.destinationName}
                                onChange={(event) =>
                                    updateField("destinationName", event.target.value)
                                }
                                placeholder="Bali Paradise"
                                className={inputClass}
                            />
                        </label>

                        {/* Country / Category */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className={labelClass}>Country</span>
                                <input
                                    type="text"
                                    required
                                    value={form.country}
                                    onChange={(event) =>
                                        updateField("country", event.target.value)
                                    }
                                    placeholder="Indonesia"
                                    className={inputClass}
                                />
                            </label>

                            <label className="block">
                                <span className={labelClass}>Category</span>
                                <span className="relative block">
                                    <select
                                        value={form.category}
                                        onChange={(event) =>
                                            updateField("category", event.target.value)
                                        }
                                        className={`${inputClass} cursor-pointer appearance-none pr-9`}
                                    >
                                        {categoryOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
                                        aria-hidden
                                    />
                                </span>
                            </label>
                        </div>

                        {/* Price / Duration */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className={labelClass}>Price (USD)</span>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={form.price}
                                    onChange={(event) =>
                                        updateField("price", event.target.value)
                                    }
                                    placeholder="e.g., 1299"
                                    className={inputClass}
                                />
                            </label>

                            <label className="block">
                                <span className={labelClass}>Duration</span>
                                <input
                                    type="text"
                                    required
                                    value={form.duration}
                                    onChange={(event) =>
                                        updateField("duration", event.target.value)
                                    }
                                    placeholder="e.g., 7 Days/6 Nights"
                                    className={inputClass}
                                />
                            </label>
                        </div>

                        {/* Departure date */}
                        <label className="block">
                            <span className={labelClass}>Departure Date</span>
                            <input
                                type="date"
                                required
                                value={form.departureDate}
                                onChange={(event) =>
                                    updateField("departureDate", event.target.value)
                                }
                                className={inputClass}
                            />
                        </label>

                        {/* Image URL */}
                        <label className="block">
                            <span className={labelClass}>Image URL</span>
                            <input
                                type="url"
                                required
                                value={form.imageUrl}
                                onChange={(event) =>
                                    updateField("imageUrl", event.target.value)
                                }
                                placeholder="https://example.com/image.jpg"
                                className={inputClass}
                            />
                        </label>

                        {/* Description */}
                        <label className="block">
                            <span className={labelClass}>Description</span>
                            <textarea
                                required
                                rows={5}
                                value={form.description}
                                onChange={(event) =>
                                    updateField("description", event.target.value)
                                }
                                placeholder="Describe the travel experience..."
                                className={`${inputClass} h-auto min-h-28 resize-y py-2.5`}
                            />
                        </label>
                    </div>

                    {/* Actions */}
                    {submitted && (
                        <p
                            role="status"
                            className="mt-5 text-sm font-medium text-[#20a34a]"
                        >
                            Travel package added successfully.
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setForm(emptyForm);
                                setSubmitted(false);
                            }}
                            className="inline-flex h-10 items-center gap-1.5 border border-[#ff8a8a] px-4 text-sm font-medium text-[#ff4040] transition-colors hover:bg-red-50"
                        >
                            <Trash className="size-4" strokeWidth={1.75} aria-hidden />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="inline-flex h-10 items-center gap-2 bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand/90"
                        >
                            <Save className="size-4" strokeWidth={1.75} aria-hidden />
                            Add Travel Package
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
