
"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import {
    Camera,
    Check,
    DollarSign,
    Globe,
    MapPin,
    Pencil,
    Plane,
    TrendingUp,
} from "lucide-react";

type Stat = {
    label: string;
    value: string;
    icon: typeof Plane;
    iconClassName: string;
};

const stats: Stat[] = [
    {
        label: "Total Bookings",
        value: "12",
        icon: Plane,
        iconClassName: "bg-[#e4f6fb] text-brand",
    },
    {
        label: "Countries Visited",
        value: "18",
        icon: Globe,
        iconClassName: "bg-[#e7f8ed] text-[#20a34a]",
    },
    {
        label: "Upcoming Trips",
        value: "2",
        icon: TrendingUp,
        iconClassName: "bg-[#fff2e2] text-[#f59e0b]",
    },
    {
        label: "Total Spent",
        value: "$15,750",
        icon: DollarSign,
        iconClassName: "bg-[#fce9f5] text-[#ec4899]",
    },
];

const details = [
    { label: "Member since", value: "Mar 2024" },
    { label: "Nationality", value: "United States" },
];

const editInputClass =
    "block h-10 w-full rounded-md bg-neutral-100 px-3 text-sm text-neutral-900 outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-brand";

export default function UserProfile() {
    const [avatarUrl, setAvatarUrl] = useState("/images/person2.png");
    const [name, setName] = useState("Sarah Mitchell");
    const [location, setLocation] = useState("San Francisco, CA");
    const [isEditing, setIsEditing] = useState(false);

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    return (
        <main className="min-h-screen flex-1 bg-white px-5 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page heading */}
                <header className="mb-8">
                    <h1 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500 sm:text-base">
                        Manage your account settings and travel preferences
                    </p>
                </header>

                <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
                    {/* Profile card */}
                    <section className="border border-border bg-white p-5">
                        <div className="flex flex-col items-center">
                            <div className="relative size-28">
                                <Image
                                    src={avatarUrl}
                                    alt={name}
                                    fill
                                    sizes="112px"
                                    className="rounded-full object-cover"
                                />

                                <label className="absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-brand text-white shadow-sm transition-colors hover:bg-brand/90">
                                    <Camera className="size-4" strokeWidth={1.75} aria-hidden />
                                    <span className="sr-only">
                                        Change profile photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handlePhotoChange}
                                    />
                                </label>
                            </div>

                            {isEditing ? (
                                <div className="mt-4 w-full space-y-2">
                                    <label className="block">
                                        <span className="sr-only">Name</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                            className={editInputClass}
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="sr-only">Location</span>
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(event) =>
                                                setLocation(event.target.value)
                                            }
                                            className={editInputClass}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <p className="mt-4 text-lg font-medium text-neutral-900">
                                        {name}
                                    </p>

                                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
                                        <MapPin
                                            className="size-4 shrink-0"
                                            strokeWidth={1.75}
                                            aria-hidden
                                        />
                                        {location}
                                    </p>
                                </>
                            )}

                            <dl className="mt-6 w-full space-y-3">
                                {details.map((detail) => (
                                    <div
                                        key={detail.label}
                                        className="flex items-center justify-between gap-3 text-sm"
                                    >
                                        <dt className="text-neutral-500">
                                            {detail.label}
                                        </dt>
                                        <dd className="font-semibold text-neutral-900">
                                            {detail.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            <button
                                type="button"
                                onClick={() => setIsEditing((current) => !current)}
                                className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-brand text-sm font-medium text-white transition-colors hover:bg-brand/90"
                            >
                                {isEditing ? (
                                    <>
                                        <Check className="size-4" strokeWidth={1.75} aria-hidden />
                                        Save Changes
                                    </>
                                ) : (
                                    <>
                                        <Pencil className="size-4" strokeWidth={1.75} aria-hidden />
                                        Edit Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </section>

                    {/* Travel statistics */}
                    <section>
                        <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                            Travel Statistics
                        </h2>

                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="flex items-center justify-between gap-3 border border-border bg-white p-5"
                                    >
                                        <div>
                                            <p className="text-sm text-neutral-500">
                                                {stat.label}
                                            </p>
                                            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-900">
                                                {stat.value}
                                            </p>
                                        </div>

                                        <span
                                            className={`flex size-12 shrink-0 items-center justify-center rounded-full ${stat.iconClassName}`}
                                        >
                                            <Icon
                                                className="size-5"
                                                strokeWidth={1.75}
                                                aria-hidden
                                            />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
