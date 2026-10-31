"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Pencil, Save, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type {
    DestinationCategory,
    DestinationDetails as DestinationDetailsData,
} from "@/lib/destinations";
import { useRouter } from "next/navigation";

type TravelPackageDialogProps = {
    destination: DestinationDetailsData;
};

type FormState = {
    destinationName: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

const categoryOptions: DestinationCategory[] = [
    "Beach",
    "Mountain",
    "Adventure",
    "Desert",
];

// Same field styling as the admin "Add New Travel Package" form.
const inputClass =
    "block h-10 w-full rounded-md border-transparent bg-neutral-100 px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-brand focus:bg-white";

const labelClass = "mb-1.5 block text-[13px] font-medium text-neutral-900";

const triggerClass =
    "inline-flex h-10 items-center gap-1.5 border border-border px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50";

const cancelButtonClass =
    "inline-flex h-10 items-center gap-1.5 border border-[#ff8a8a] px-4 text-sm font-medium text-[#ff4040] transition-colors hover:bg-red-50";

const saveButtonClass =
    "inline-flex h-10 items-center gap-2 bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand/90";

function toFormState(destination: DestinationDetailsData): FormState {
    return {
        destinationName: destination.title,
        country: destination.country,
        category: destination.category,
        price: String(destination.price),
        duration: destination.duration,
        departureDate: destination.departureDate,
        imageUrl: destination.image,
        description: destination.overview,
    };
}

export function TravelPackageDialog({
    destination,
}: TravelPackageDialogProps) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(() =>
        toFormState(destination)
    );
    const [saved, setSaved] = useState(false);

    const router = useRouter();

    // Reset to the current destination every time the dialog opens.
    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (nextOpen) {
            setForm(toFormState(destination));
            setSaved(false);
        }
    };

    const updateField = (field: keyof FormState, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setSaved(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const res = await fetch(
            `http://localhost:5001/destination/${destination.id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
        );

        if (res.ok) {
            router.refresh();
            setSaved(true);
            handleOpenChange(false);
        }

    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger type="button" className={triggerClass}>
                <Pencil className="size-3.5" strokeWidth={1.75} aria-hidden />
                Edit
            </DialogTrigger>

            <DialogContent className="p-6 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg">
                        Update Travel Package
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to the travel package details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Destination name */}
                    <label className="block">
                        <span className="sr-only">Destination Name</span>
                        <input
                            type="text"
                            required
                            value={form.destinationName}
                            onChange={(event) =>
                                updateField(
                                    "destinationName",
                                    event.target.value
                                )
                            }
                            placeholder="Bali Paradise"
                            className={inputClass}
                        />
                    </label>

                    {/* Country / Category */}
                    <div className="grid gap-4 sm:grid-cols-2">
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
                                        updateField(
                                            "category",
                                            event.target.value
                                        )
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
                                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                                    aria-hidden
                                />
                            </span>
                        </label>
                    </div>

                    {/* Price / Duration */}
                    <div className="grid gap-4 sm:grid-cols-2">
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
                                    updateField(
                                        "duration",
                                        event.target.value
                                    )
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
                                updateField(
                                    "departureDate",
                                    event.target.value
                                )
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
                                updateField(
                                    "description",
                                    event.target.value
                                )
                            }
                            placeholder="Describe the travel experience..."
                            className={`${inputClass} h-auto min-h-28 resize-y py-2.5`}
                        />
                    </label>

                    {saved && (
                        <p
                            role="status"
                            className="text-sm font-medium text-[#20a34a]"
                        >
                            Travel package updated.
                        </p>
                    )}

                    <DialogFooter className="mx-0 mb-0 border-none bg-transparent p-0">
                        <button
                            type="button"
                            onClick={() => handleOpenChange(false)}
                            className={cancelButtonClass}
                        >
                            <Trash
                                className="size-4"
                                strokeWidth={1.75}
                                aria-hidden
                            />
                            Cancel
                        </button>

                        <button type="submit" className={saveButtonClass}>
                            <Save
                                className="size-4"
                                strokeWidth={1.75}
                                aria-hidden
                            />
                            Save Changes
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
