
"use client";

import Image from "next/image";

import {
    CalendarDays,
    Eye,
    Trash,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
    _id: string;
    title: string;
    image: string;
    departureDate: string;
    price: number;
};



export default function MyBookingsPage() {
    const userData = useSession();
    const user = userData?.data?.user;

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelId, setCancelId] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5001/booking/${user.id}`)
                .then((res) => res.json())
                .then((data) => setBookings(data));
        }
    }, [user]);

    const router = useRouter();

    const cancelBooking = async (id: string) => {
        const res = await fetch(`http://localhost:5001/booking/${id}`, {
            method: "DELETE",
        })

        if (res.ok) {
            router.refresh();
            setBookings(bookings.filter((booking) => booking._id !== id));
            setCancelId(null);
        }
    };


    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page heading */}
                <header className="mb-7 sm:mb-8">
                    <h1 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500 sm:text-base">
                        Manage and view your upcoming travel plans
                    </p>
                </header>

                {/* Booking list */}
                <section className="space-y-5" aria-label="My bookings">
                    {bookings.map((booking) => (
                        <article
                            key={booking._id}
                            className="group border border-border bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md sm:p-4"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                                {/* Destination image */}
                                <div className="relative h-52 w-full shrink-0 overflow-hidden bg-neutral-100 sm:h-[145px] sm:w-[33%]">
                                    <Image
                                        src={booking.image}
                                        alt={booking.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Booking details */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div>

                                        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-[25px]">
                                            {booking.title}
                                        </h2>

                                        <div className="mt-3 space-y-2 text-xs text-neutral-500 sm:text-sm">
                                            <p className="flex items-center gap-1.5">
                                                <CalendarDays className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                                                <span>Departure: {booking.departureDate}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price and actions */}
                                    <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between sm:pt-3">
                                        <p className="text-[26px] font-semibold leading-none tracking-tight text-brand">
                                            ${booking.price}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setCancelId(booking._id)}
                                                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 border border-[#ff8a8a] px-4 text-xs font-medium text-[#ff4040] transition-colors hover:bg-red-50 sm:flex-none"
                                            >
                                                <Trash className="size-3.5" strokeWidth={1.75} aria-hidden />
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setSelectedBooking(booking)}
                                                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 bg-brand px-5 text-xs font-medium text-white transition-colors hover:bg-brand/90 sm:flex-none"
                                            >
                                                <Eye className="size-3.5" strokeWidth={1.75} aria-hidden />
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    {/* Empty state */}
                    {bookings.length === 0 && (
                        <div className="border border-dashed border-border px-5 py-16 text-center">
                            <p className="text-2xl font-medium text-neutral-900">
                                No bookings yet
                            </p>
                            <p className="mt-2 text-sm text-neutral-500">
                                Your upcoming travel plans will appear here.
                            </p>
                        </div>
                    )}
                </section>
            </div>

            {/* View booking modal */}
            {selectedBooking && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setSelectedBooking(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        className="w-full max-w-md bg-white p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative mb-5 h-48 w-full overflow-hidden bg-neutral-100">
                            <Image
                                src={selectedBooking.image}
                                alt={selectedBooking.title}
                                fill
                                sizes="(max-width: 640px) 100vw, 448px"
                                className="object-cover"
                            />
                        </div>

                        <h2
                            id="booking-modal-title"
                            className="text-2xl font-bold tracking-tight"
                        >
                            {selectedBooking.title}
                        </h2>

                        <p className="mt-2 text-sm text-neutral-500">
                            Departure: {selectedBooking.departureDate}
                        </p>

                        <p className="mt-3 text-2xl font-semibold text-brand">
                            ${selectedBooking.price}
                        </p>

                        <button
                            type="button"
                            onClick={() => setSelectedBooking(null)}
                            className="mt-6 w-full bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand/90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Cancel confirmation modal */}
            {cancelId !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setCancelId(null)}
                >
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="cancel-modal-title"
                        className="w-full max-w-sm bg-white p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2
                            id="cancel-modal-title"
                            className="text-2xl font-bold tracking-tight text-neutral-900"
                        >
                            Cancel booking?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-neutral-500">
                            Are you sure you want to cancel this booking? This demo
                            will remove it from the list.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setCancelId(null)}
                                className="flex-1 border border-border px-3 py-2.5 text-sm hover:bg-neutral-50"
                            >
                                Keep booking
                            </button>

                            <button
                                type="button"
                                onClick={() => cancelBooking(cancelId)}
                                className="flex-1 bg-red-500 px-3 py-2.5 text-sm text-white hover:bg-red-600"
                            >
                                Yes, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
