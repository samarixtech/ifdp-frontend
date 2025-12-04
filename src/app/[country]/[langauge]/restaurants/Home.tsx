import { useCLC } from "@/app/context/CLCContext.tsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import image from "./../../../../../public/logo.png";
import Image from "next/image";
import { useAutoLocation } from "@/hooks/useAutoLocation";

const cuisines = [
  {
    name: "Pizza",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Biryani",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Fast Food",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Burgers",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Halwa Puri",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Desserts",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Paratha",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Chinese",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
];

export interface Restaurant {
  id: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  image: string;
  geoPoint: {
    lat: number;
    lng: number;
  };
  hoursJson: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  distance: number | null;
}

interface ApiResponse {
  status: string;
  results: number;
  data: Restaurant[];
}

interface DealCard {
  title: string;
  img: string;
  desc: string;
}

const deals: DealCard[] = [
  {
    title: "Up to 30% off!",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    desc: "Great discounts today!",
  },
  {
    title: "Deal for ₨.1250",
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    desc: "Best prices available",
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const { country, currency, language } = useCLC();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    latitude: autoLatitude,
    longitude: autoLongitude,
    loading: isDetectingLocation,
    error: locationError,
  } = useAutoLocation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Wait for location detection to complete
      if (isDetectingLocation) return;

      // Use detected location or default to Karachi coordinates
      const lat = autoLatitude || 24.8607;
      const lng = autoLongitude || 67.0011;

      try {
        setLoading(true);
        const response = await fetch(
          `http://192.168.100.29:5000/api/v1/restaurants/location/by-location?lat=${lat}&lng=${lng}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.status === "success") {
          setRestaurants(data.data);
        } else {
          throw new Error("Failed to fetch restaurants");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [autoLatitude, autoLongitude, isDetectingLocation]);

  if (locationError) {
    return (
      <div className="bg-[#E8F4F1] min-h-screen text-[#2C2C2C] px-4 md:px-16 py-8 rounded-xl">
        <div className="text-center py-8">
          <h2 className="text-xl text-red-600">Location Error</h2>
          <p className="text-gray-700 mt-2">{locationError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E8F4F1] min-h-screen text-[#2C2C2C] px-4 md:px-16 py-8 rounded-xl">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search for restaurants, cuisines, and dishes"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#2C2C2C] placeholder-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#0B5D4E]"
        />
      </div>

      {/* Banner */}
      <div className="relative bg-[#0B5D4E] rounded-lg p-6 mb-10 flex flex-col md:flex-row items-center shadow-md gap-6 md:gap-0">
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-500 leading-snug">
            Sign up for free delivery on your first order
          </h2>

          <button className="bg-[#E8F4F1] text-[#0B5D4E] px-7 py-2 rounded-md font-semibold hover:bg-[#0B5D4E] hover:text-white transition w-full md:w-auto">
            Sign up
          </button>
        </div>

        {/* Image */}
        <Image
          src={image || "/default-mascot.png"}
          alt="JAYAK HUB mascot"
          width={350}
          height={150}
          className="rounded-xl object-contain mx-auto md:ml-auto w-40 sm:w-52 md:w-72 lg:w-80"
          priority={false}
        />
      </div>

      {/* Daily Deals */}
      <SectionTitle title="Your daily deals" />
      <HorizontalScroller>
        {deals.map((deal) => (
          <DealCard
            key={deal.title}
            title={deal.title}
            img={deal.img}
            desc={deal.desc}
          />
        ))}
      </HorizontalScroller>

      {/* Cuisines */}
      <SectionTitle title="Cuisines for you" />
      <div className="flex overflow-x-auto space-x-6 pb-3">
        {cuisines.map(({ name, img }) => (
          <div
            key={name}
            className="flex flex-col items-center min-w-20 cursor-pointer"
          >
            <img
              src={img}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mb-2 shadow-md"
              loading="lazy"
            />
            <span className="text-[#2C2C2C] text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>

      {/* New on JAYAK HUB */}
      <SectionTitle title="New on Jayak Hub" />

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {isDetectingLocation
              ? "Detecting your location..."
              : "Loading restaurants..."}
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-[#0B5D4E] text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No restaurants found in your area.</p>
        </div>
      ) : (
        <HorizontalScroller>
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() =>
                router.push(
                  `/${country}/${language}/restaurants/${restaurant.id}`
                )
              }
              className="cursor-pointer"
            >
              <RestaurantCard
                restaurant={restaurant}
                currency={currency}
                language={language}
              />
            </div>
          ))}
        </HorizontalScroller>
      )}
    </div>
  );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#2C2C2C] border-b border-gray-300 pb-2">
    {title}
  </h3>
);

const HorizontalScroller: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="flex overflow-x-auto space-x-6 mb-10 scrollbar-hide py-2">
    {children}
  </div>
);

const DealCard: React.FC<{ title: string; img: string; desc: string }> = ({
  title,
  img,
  desc,
}) => (
  <div className="min-w-60 bg-[#E8F4F1] rounded-lg shadow-md flex items-center gap-4 p-4 cursor-pointer hover:shadow-lg transition">
    <img
      src={img}
      alt={desc}
      className="w-24 h-24 rounded-lg object-cover shrink-0"
      loading="lazy"
    />
    <div>
      <h4 className="text-lg font-semibold text-[#0B5D4E]">{title}</h4>
      <p className="text-[#2C2C2C] text-sm mt-1">{desc}</p>
    </div>
  </div>
);

interface RestaurantCardProps {
  restaurant: Restaurant;
  currency: string;
  language: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  currency,
  language,
}) => {
  // Format restaurant hours for display
  const formatHours = (hoursJson: Record<string, any>) => {
    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();
    const hours = hoursJson[today];

    if (!hours) return "Closed today";

    if (Array.isArray(hours)) {
      return `${hours[0]?.start || "N/A"} - ${hours[0]?.end || "N/A"}`;
    }

    return typeof hours === "string" ? hours : "10:00-23:00";
  };

  // Calculate time from creation date
  const getTimeSinceCreation = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return "Just added";
    } else if (diffInHours < 168) {
      // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return "Recently";
    }
  };

  const displayName = language === "ar" ? restaurant.nameAr : restaurant.nameEn;
  const operatingHours = formatHours(restaurant.hoursJson);
  const timeAdded = getTimeSinceCreation(restaurant.createdAt);

  return (
    <div className="min-w-[220px] bg-[#E8F4F1] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition relative">
      <img
        src={
          restaurant.image ||
          "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
        }
        alt={displayName}
        className="w-full h-36 rounded-t-lg object-cover"
        loading="lazy"
      />
      <div className="absolute top-2 left-2 bg-[#0B5D4E] text-[#E8F4F1] text-xs px-2 py-1 rounded font-semibold">
        NEW
      </div>
      <div className="p-4">
        <h4 className="text-[#2C2C2C] font-semibold text-lg truncate">
          {displayName}
        </h4>
        <p className="text-gray-700 text-sm">{operatingHours}</p>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{timeAdded}</span>
          <span>
            {restaurant.distance
              ? `${restaurant.distance.toFixed(1)} km`
              : "Nearby"}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-yellow-500 font-semibold">
          {"★".repeat(Math.floor(restaurant.rating))}
          {restaurant.rating % 1 ? "½" : ""}
          <span className="text-gray-500 text-sm ml-1">
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
