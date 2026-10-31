"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, TriangleAlert } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { DestinationDetails as DestinationDetailsData } from "@/lib/destinations";

type DeletePackageDialogProps = {
    destination: DestinationDetailsData;
};

const triggerClass =
    "inline-flex h-10 items-center gap-1.5 border border-[#ff8a8a] px-4 text-sm font-medium text-[#ff4040] transition-colors hover:bg-red-50";

const cancelButtonClass =
    "inline-flex h-10 items-center gap-1.5 border border-border px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50";

const deleteButtonClass =
    "inline-flex h-10 items-center gap-2 bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50";

export function DeletePackageDialog({
    destination,
}: DeletePackageDialogProps) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    // Reset the error state every time the dialog opens.
    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (nextOpen) {
            setError(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        setError(false);

        try {
            const res = await fetch(
                `http://localhost:5001/destination/${destination.id}`,
                { method: "DELETE" }
            );

            if (!res.ok) {
                setError(true);
                return;
            }

            // Deleted — go back to the list with fresh data.
            router.push("/destinations");
            router.refresh();
        } catch {
            setError(true);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger type="button" className={triggerClass}>
                <Trash className="size-3.5" strokeWidth={1.75} aria-hidden />
                Cancel
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex-row items-center gap-3 space-y-0 text-left">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert
                            className="size-5 text-red-500"
                            strokeWidth={1.75}
                            aria-hidden
                        />
                    </span>

                    <DialogTitle className="text-lg leading-snug">
                        Delete Travel Package
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="leading-6">
                    Are you sure you want to delete{" "}
                    <strong className="font-semibold text-neutral-900">
                        &quot;{destination.title}&quot;
                    </strong>
                    ? This action cannot be undone and will permanently remove
                    this travel package from the system.
                </DialogDescription>

                {error && (
                    <p role="alert" className="text-sm font-medium text-red-500">
                        Could not delete this travel package. Please try again.
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => handleOpenChange(false)}
                        disabled={deleting}
                        className={cancelButtonClass}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className={deleteButtonClass}
                    >
                        <Trash
                            className="size-4"
                            strokeWidth={1.75}
                            aria-hidden
                        />
                        {deleting ? "Deleting..." : "Delete Package"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
