export type DestinationCategory = "Beach" | "Mountain" | "Adventure" | "Desert";

export type Destination = {
    // `number` for the built-in seed data, `string` for API records (Mongo `_id`).
    id: number | string;
    title: string;
    location: string;
    image: string;
    category: DestinationCategory;
    price: number;
    duration: string;
    // API records do not carry a rating yet.
    rating?: number;
};

export const destinations: Destination[] = [
    {
        id: 1,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image1.png",
        category: "Beach",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
    {
        id: 2,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image2.png",
        category: "Beach",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
    {
        id: 3,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image3.png",
        category: "Adventure",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
    {
        id: 4,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image4.png",
        category: "Mountain",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
    {
        id: 5,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image5.png",
        category: "Beach",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
    {
        id: 6,
        title: "Bali Paradise",
        location: "Nepal",
        image: "/images/destinations/image6.png",
        category: "Desert",
        price: 2700,
        duration: "7 Days/6 Nights",
        rating: 4.5,
    },
];

export type DestinationDetails = {
    // `number` for the built-in seed data, `string` for API records (Mongo `_id`).
    id: number | string;
    title: string;
    country: string;
    category: DestinationCategory;
    image: string;
    price: number;
    // API records do not carry a rating or review count yet.
    rating?: number;
    reviews?: number;
    duration: string;
    departureDate: string;
    overview: string;
    highlights: string[];
    perks: string[];
};

const detailsTemplate = {
    country: "Indonesia",
    price: 1299,
    rating: 4.9,
    reviews: 234,
    duration: "7 Days / 6 Nights",
    departureDate: "2026-05-15",
    overview:
        "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
    highlights: [
        "Luxury beachfront accommodation",
        "Visit Uluwatu Temple at sunset",
        "Traditional Balinese spa treatment",
        "Private beach dinner experience",
        "Sunrise trek to Mount Batur",
    ],
    perks: [
        "Free cancellation up to 7 days",
        "Travel insurance included",
        "24/7 customer support",
    ],
};

export const destinationDetails: DestinationDetails[] = destinations.map(
    (destination) => ({
        id: destination.id,
        title: destination.title,
        category: destination.category,
        image: destination.image,
        ...detailsTemplate,
    })
);

export function getDestinationDetails(id: string) {
    return destinationDetails.find(
        (destination) => String(destination.id) === id
    );
}

// ---------------------------------------------------------------------------
// Travel API (http://localhost:5001)
// ---------------------------------------------------------------------------

export type ApiDestination = {
    _id: string;
    destinationName: string;
    country: string;
    category: DestinationCategory;
    price: string | number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

const TRAVEL_API_BASE_URL = "http://localhost:5001";

export const DESTINATIONS_API_URL = `${TRAVEL_API_BASE_URL}/destinations`;

function destinationApiUrl(id: string) {
    return `${TRAVEL_API_BASE_URL}/destination/${encodeURIComponent(id)}`;
}

export async function fetchApiDestinations(): Promise<ApiDestination[]> {
    const response = await fetch(DESTINATIONS_API_URL);

    if (!response.ok) {
        throw new Error(`Failed to load destinations (${response.status})`);
    }

    return response.json();
}

/**
 * Fetch a single destination: GET http://localhost:5001/destination/:id
 *
 * Returns `null` when the API does not know the id (it answers non-2xx).
 * Network failures reject so the caller can surface the real error.
 */
export async function fetchApiDestination(
    id: string
): Promise<ApiDestination | null> {
    const response = await fetch(destinationApiUrl(id));

    if (!response.ok) {
        return null;
    }

    return response.json();
}

/** Shape an API record the way the destination cards expect it. */
export function toDestination(item: ApiDestination): Destination {
    return {
        id: item._id,
        title: item.destinationName.trim(),
        location: item.country.trim(),
        image: item.imageUrl,
        category: item.category,
        price: Number(item.price),
        duration: item.duration.trim(),
    };
}

/** Shape an API record the way the destination details page expects it. */
export function toDestinationDetails(item: ApiDestination): DestinationDetails {
    return {
        id: item._id,
        title: item.destinationName.trim(),
        country: item.country.trim(),
        category: item.category,
        image: item.imageUrl,
        price: Number(item.price),
        duration: item.duration.trim(),
        departureDate: item.departureDate,
        overview: item.description.trim(),
        highlights: [],
        perks: [],
    };
}
