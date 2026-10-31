import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DestinationDetails } from "@/components/destination-details";
import {
    destinationDetails,
    fetchApiDestination,
    getDestinationDetails,
    toDestinationDetails,
} from "@/lib/destinations";

export function generateStaticParams() {
    return destinationDetails.map(({ id }) => ({
        destinationid: String(id),
    }));
}

export default function DestinationDetailsPage({
    params,
}: PageProps<"/destinations/details/[destinationid]">) {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen flex-1 bg-white px-5 py-8 sm:px-8 sm:py-10">
                    <p
                        role="status"
                        className="mx-auto max-w-6xl text-sm text-neutral-500"
                    >
                        Loading destination...
                    </p>
                </main>
            }
        >
            <DestinationDetailsContent params={params} />
        </Suspense>
    );
}

async function DestinationDetailsContent({
    params,
}: Pick<PageProps<"/destinations/details/[destinationid]">, "params">) {
    const { destinationid } = await params;

    // Built-in seed destinations resolve without hitting the API.
    const destination = getDestinationDetails(destinationid);

    if (destination) {
        return <DestinationDetails destination={destination} />;
    }

    // Everything else is fetched from the travel API:
    // GET http://localhost:5001/destination/:id — uncached, so it streams
    // behind the Suspense boundary (required by Cache Components).
    const item = await fetchApiDestination(destinationid);

    if (!item) {
        notFound();
    }

    return <DestinationDetails destination={toDestinationDetails(item)} />;
}
