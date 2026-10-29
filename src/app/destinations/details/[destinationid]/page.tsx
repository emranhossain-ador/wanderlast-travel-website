import { notFound } from "next/navigation";
import { DestinationDetails } from "@/components/destination-details";
import {
    destinationDetails,
    getDestinationDetails,
} from "@/lib/destinations";

export function generateStaticParams() {
    return destinationDetails.map(({ id }) => ({
        destinationid: String(id),
    }));
}

export default async function DestinationDetailsPage({
    params,
}: PageProps<"/destinations/details/[destinationid]">) {
    const { destinationid } = await params;
    const destination = getDestinationDetails(destinationid);

    if (!destination) {
        notFound();
    }

    return <DestinationDetails destination={destination} />;
}
