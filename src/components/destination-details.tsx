
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    MapPin,
    Pencil,
    Star,
    Trash,
} from "lucide-react";
import type { DestinationDetails as DestinationDetailsData } from "@/lib/destinations";

type DestinationDetailsProps = {
    destination: DestinationDetailsData;
};

export function DestinationDetails({ destination }: DestinationDetailsProps) {
    const [departureDate, setDepartureDate] = useState(
        destination.departureDate
    );

    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto max-w-6xl">
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-brand"
                    >
                        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
                        Back to Destinations
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="inline-flex h-10 items-center gap-1.5 border border-border px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                        >
                            <Pencil className="size-3.5" strokeWidth={1.75} aria-hidden />
                            Edit
                        </Link>

                        <Link
                            href="/destinations"
                            className="inline-flex h-10 items-center gap-1.5 border border-[#ff8a8a] px-4 text-sm font-medium text-[#ff4040] transition-colors hover:bg-red-50"
                        >
                            <Trash className="size-3.5" strokeWidth={1.75} aria-hidden />
                            Cancel
                        </Link>
                    </div>
                </div>

                {/* Hero image */}
                <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden bg-neutral-100 sm:aspect-[5/2]">
                    <Image
                        src={destination.image}
                        alt={destination.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div>
                        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                            <MapPin className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            {destination.country}
                        </p>

                        <h1 className="mt-1.5 text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
                            {destination.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                                <Star
                                    className="size-4 fill-current text-[#16a34a]"
                                    aria-hidden
                                />
                                {destination.rating}
                                <span className="font-normal text-neutral-500">
                                    ({destination.reviews} reviews)
                                </span>
                            </span>

                            <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                                <CalendarDays
                                    className="size-4 shrink-0 text-neutral-500"
                                    strokeWidth={1.75}
                                    aria-hidden
                                />
                                {destination.duration}
                            </span>
                        </div>

                        {/* Overview */}
                        <section className="mt-9">
                            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                                Overview
                            </h2>
                            <p className="mt-3 max-w-[640px] text-sm leading-7 text-neutral-500">
                                {destination.overview}
                            </p>
                        </section>

                        {/* Highlights */}
                        <section className="mt-8">
                            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                                Highlights
                            </h2>
                            <p className="mt-3 max-w-[640px] text-sm leading-7 text-neutral-500">
                                {destination.overview}
                            </p>

                            <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                                {destination.highlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="flex items-center gap-2 text-sm text-neutral-700"
                                    >
                                        <Check
                                            className="size-4 shrink-0 text-[#16a34a]"
                                            strokeWidth={2.25}
                                            aria-hidden
                                        />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Booking card */}
                    <aside className="h-fit border border-border bg-white p-5 lg:sticky lg:top-24">
                        <p className="text-[13px] text-neutral-500">
                            Starting from
                        </p>
                        <p className="mt-1.5 text-[30px] font-semibold leading-none tracking-tight text-brand">
                            ${destination.price}
                        </p>
                        <p className="mt-1.5 text-xs text-neutral-500">
                            per person
                        </p>

                        <label className="mt-5 block">
                            <span className="sr-only">Departure date</span>
                            <input
                                type="date"
                                value={departureDate}
                                onChange={(event) =>
                                    setDepartureDate(event.target.value)
                                }
                                className="block h-10 w-full rounded-md bg-neutral-100 px-3 text-sm text-neutral-900 outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-brand"
                            />
                        </label>

                        <Link
                            href="/my-bookings"
                            className="mt-3 flex h-11 w-full items-center justify-center gap-2 bg-brand text-sm font-medium text-white transition-colors hover:bg-brand/90"
                        >
                            Book Now
                            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                        </Link>

                        <ul className="mt-5 space-y-2.5">
                            {destination.perks.map((perk) => (
                                <li
                                    key={perk}
                                    className="flex items-center gap-2 text-[13px] text-neutral-600"
                                >
                                    <Check
                                        className="size-4 shrink-0 text-[#16a34a]"
                                        strokeWidth={2.25}
                                        aria-hidden
                                    />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </main>
    );
}
