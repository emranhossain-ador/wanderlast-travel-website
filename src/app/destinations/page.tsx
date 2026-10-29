
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { destinations } from "@/lib/destinations";
import {
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    MapPin,
    Star,
} from "lucide-react";

const categoryOptions = [
    "All Categories",
    "Beach",
    "Mountain",
    "Adventure",
    "Desert",
];

const priceOptions = [
    { label: "Price Range", min: 0, max: Number.POSITIVE_INFINITY },
    { label: "Under $2,500", min: 0, max: 2500 },
    { label: "$2,500 - $3,000", min: 2500, max: 3000 },
    { label: "Over $3,000", min: 3000, max: Number.POSITIVE_INFINITY },
];

const sortOptions = [
    "Sort By",
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
];

export default function DestinationsPage() {
    const [category, setCategory] = useState(categoryOptions[0]);
    const [priceRange, setPriceRange] = useState(priceOptions[0].label);
    const [sort, setSort] = useState(sortOptions[0]);

    const selectedPrice =
        priceOptions.find((option) => option.label === priceRange) ??
        priceOptions[0];

    let visibleDestinations = destinations.filter((destination) => {
        const matchesCategory =
            category === categoryOptions[0] ||
            destination.category === category;
        const matchesPrice =
            destination.price >= selectedPrice.min &&
            destination.price < selectedPrice.max;

        return matchesCategory && matchesPrice;
    });

    if (sort === sortOptions[1]) {
        visibleDestinations = [...visibleDestinations].sort(
            (a, b) => a.price - b.price
        );
    } else if (sort === sortOptions[2]) {
        visibleDestinations = [...visibleDestinations].sort(
            (a, b) => b.price - a.price
        );
    } else if (sort === sortOptions[3]) {
        visibleDestinations = [...visibleDestinations].sort(
            (a, b) => b.rating - a.rating
        );
    }

    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page heading */}
                <header className="mb-8">
                    <h1 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
                        Explore All Destinations
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500 sm:text-base">
                        Find your perfect travel experience from our curated
                        collection
                    </p>
                </header>

                {/* Filters */}
                <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <label className="relative block">
                        <span className="sr-only">Category</span>
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="h-11 w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-[13px] uppercase tracking-wide text-neutral-500 outline-none"
                        >
                            {categoryOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden
                        />
                    </label>

                    <label className="relative block">
                        <span className="sr-only">Price range</span>
                        <select
                            value={priceRange}
                            onChange={(event) => setPriceRange(event.target.value)}
                            className="h-11 w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-[13px] uppercase tracking-wide text-neutral-500 outline-none"
                        >
                            {priceOptions.map((option) => (
                                <option key={option.label} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden
                        />
                    </label>

                    <label className="relative block">
                        <span className="sr-only">Sort by</span>
                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="h-11 w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-[13px] uppercase tracking-wide text-neutral-500 outline-none"
                        >
                            {sortOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden
                        />
                    </label>
                </div>

                {/* Result count */}
                <p className="mb-5 mt-4 text-sm text-neutral-500">
                    Showing {visibleDestinations.length} destinations
                </p>

                {/* Destination grid */}
                <section
                    className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
                    aria-label="Destinations"
                >
                    {visibleDestinations.map((destination) => (
                        <article key={destination.id} className="group">
                            <Link
                                href={`/destinations/details/${destination.id}`}
                                className="relative block aspect-[16/9] overflow-hidden bg-neutral-100"
                            >
                                <Image
                                    src={destination.image}
                                    alt={destination.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-[4px] bg-white px-2 py-1 text-xs font-medium text-neutral-900 shadow-sm">
                                    {destination.rating}
                                    <Star
                                        className="size-3.5 fill-current"
                                        aria-hidden
                                    />
                                </span>
                            </Link>

                            <div className="mt-3">
                                <p className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                                    <MapPin
                                        className="size-3.5 shrink-0"
                                        strokeWidth={1.75}
                                        aria-hidden
                                    />
                                    {destination.location}
                                </p>

                                <div className="mt-1.5 flex items-baseline justify-between gap-3">
                                    <h2 className="text-lg font-medium tracking-tight text-neutral-900">
                                        <Link
                                            href={`/destinations/details/${destination.id}`}
                                            className="transition-colors hover:text-brand"
                                        >
                                            {destination.title}
                                        </Link>
                                    </h2>

                                    <p className="shrink-0">
                                        <span className="text-lg font-semibold tracking-tight text-neutral-900">
                                            ${destination.price}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            /Person
                                        </span>
                                    </p>
                                </div>

                                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-neutral-500">
                                    <CalendarDays
                                        className="size-3.5 shrink-0"
                                        strokeWidth={1.75}
                                        aria-hidden
                                    />
                                    {destination.duration}
                                </p>

                                <Link
                                    href="/my-bookings"
                                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-brand transition-colors hover:text-brand/80"
                                >
                                    Book Now
                                    <ArrowUpRight
                                        className="size-3.5"
                                        strokeWidth={1.75}
                                        aria-hidden
                                    />
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>

                {/* Empty state */}
                {visibleDestinations.length === 0 && (
                    <div className="border border-dashed border-border px-5 py-16 text-center">
                        <p className="text-2xl font-medium text-neutral-900">
                            No destinations found
                        </p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Try adjusting the filters to see more results.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
