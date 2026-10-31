
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Star,
} from "lucide-react";
import type { DestinationDetails as DestinationDetailsData } from "@/lib/destinations";
import { DeletePackageDialog } from "@/components/delete-package-dialog";
import { TravelPackageDialog } from "@/components/travel-package-dialog";
import BookingCard from "./BookingCard";

type DestinationDetailsProps = {
    destination: DestinationDetailsData;
};

export function DestinationDetails({ destination }: DestinationDetailsProps) {

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
                        <TravelPackageDialog destination={destination} />

                        <DeletePackageDialog destination={destination} />
                    </div>
                </div>

                {/* Hero image */}
                <div className="relative mt-5 aspect-video w-full overflow-hidden bg-neutral-100 sm:aspect-5/2">
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
                            {destination.rating != null && (
                                <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                                    <Star
                                        className="size-4 fill-current text-[#16a34a]"
                                        aria-hidden
                                    />
                                    {destination.rating}
                                    <span className="font-normal text-neutral-500">
                                        ({destination.reviews ?? 0} reviews)
                                    </span>
                                </span>
                            )}

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
                            <p className="mt-3 max-w-160 text-sm leading-7 text-neutral-500">
                                {destination.overview}
                            </p>
                        </section>

                        {/* Highlights */}
                        <section className="mt-8">
                            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                                Highlights
                            </h2>
                            <p className="mt-3 max-w-160 text-sm leading-7 text-neutral-500">
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
                    <BookingCard destination={destination} />
                </div>
            </div>
        </main>
    );
}
