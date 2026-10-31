import { ArrowRight, Check } from "lucide-react";
import { DestinationDetails as DestinationDetailsData } from "@/lib/destinations";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const BookingCard = ({ destination }: { destination: DestinationDetailsData }) => {

    const userData = useSession();
    const user = userData?.data?.user;

    const router = useRouter();

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const departure = e.currentTarget.departureDate.value;

        const res = await fetch("http://localhost:5001/booking", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user?.id,
                username: user?.name,
                email: user?.email,

                ...destination,
                departureDate: departure,
                bookingDate: new Date().toISOString(),

            })
        })

        if (res.ok) {
            router.push("/my-bookings");
        } else {
            alert("Failed to book!");
        }
    }

    return (
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

            <form onSubmit={handleBooking}>
                <label className="mt-5 block">
                    <span className="sr-only">Departure date</span>
                    <input
                        type="date"
                        defaultValue={destination.departureDate}
                        name="departureDate"
                        className="block h-10 w-full rounded-md bg-neutral-100 px-3 text-sm text-neutral-900 outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-brand"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 bg-brand text-sm font-medium text-white transition-colors hover:bg-brand/90"
                >
                    Book Now
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                </button>
            </form>

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

    )
}
export default BookingCard;