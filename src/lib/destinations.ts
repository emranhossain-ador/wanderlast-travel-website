export type DestinationCategory = "Beach" | "Mountain" | "Adventure" | "Desert";

export type Destination = {
    id: number;
    title: string;
    location: string;
    image: string;
    category: DestinationCategory;
    price: number;
    duration: string;
    rating: number;
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
    id: number;
    title: string;
    country: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
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
        image: destination.image,
        ...detailsTemplate,
    })
);

export function getDestinationDetails(id: string) {
    return destinationDetails.find(
        (destination) => String(destination.id) === id
    );
}
