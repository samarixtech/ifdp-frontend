import { useCLC } from "@/app/context/CLCContext.tsx";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import image from "./../../../../../public/logo.png";
import Image from "next/image";
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
export interface FoodItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  price: string;
  rating: number;
  img: string;
  discount?: string;
}
export const sampleItems: FoodItem[] = [
  {
    id: "Karahi-Tikka",
    title: "Karahi & Tikka",
    desc: "Pakistani",
    time: "15-30 min",
    price: "₨.129",
    rating: 4.9,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% off",
  },
  {
    id: "house-chilli",
    title: "House Of Chilli",
    desc: "Pakistani",
    time: "20-35 min",
    price: "₨.129",
    rating: 4.8,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% cashback",
  },
  {
    id: "Eggspectation",
    title: "Eggspectation Rest.",
    desc: "Continental",
    time: "15-30 min",
    price: "₨.129",
    rating: 5.0,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% cashback",
  },
  {
    id: "Fredarios-pizza",
    title: "Fredarios pizza",
    desc: "Pakistani",
    time: "10-25 min",
    price: "₨.129",
    rating: 4.8,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "15% off",
  },
];
interface RestaurantPageParams {
  params: {
    country: string;
    langauge: string;
    id: string;
  };
}

interface DynamicParams {
  country: string;
  langauge: string;
  id: string;
  [key: string]: string | string[] | undefined;
}
const Home: React.FC = () => {
  const router = useRouter();
  const { country, currency, language } = useCLC();
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
      <div className="relative bg-linear-to-r from-[#0B5D4E] to-[#0B5D4E] rounded-lg p-6 mb-10 flex items-center shadow-md">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-yellow-500 max-w-xs">
            Sign up for free delivery on your first order
          </h2>
          <button className="bg-[#E8F4F1] text-[#0B5D4E] px-7 py-2 rounded-md font-semibold hover:bg-[#0B5D4E] transition">
            Sign up
          </button>
        </div>
        <Image
          src={image || "/default-mascot.png"}
          alt="JAYAK HUB  mascot"
          width={394} // w-36 => 36*4 px
          height={144}
          className="ml-auto rounded-xl  object-contain"
          priority={false}
        />
      </div>

      {/* Daily Deals */}
      <SectionTitle title="Your daily deals" />
      <HorizontalScroller>
        <DealCard
          title="Up to 30% off!"
          img="https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
          desc="Great discounts today!"
        />
        <DealCard
          title="Deal for ₨.1250"
          img="https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
          desc="Best prices available"
        />
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

      {/* New on JAYAK HUB  */}
      <SectionTitle title="New on IFDP" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ id, title, desc, time, price, rating, img, discount }) => (
            <div
              key={id}
              onClick={() =>
                router.push(`/${country}/${language}/restaurants/${id}`)
              }
              className="cursor-pointer"
            >
              <FoodCard
                title={title}
                desc={desc}
                time={time}
                price={`${currency}. ${price.replace(/[^0-9]/g, "")}`}
                rating={rating}
                img={img}
                discount={discount ?? ""}
                currency={currency}
              />
            </div>
          )
        )}
      </HorizontalScroller>

      {/* Homechefs – khaas discounts */}
      <SectionTitle title="Homechefs – khaas discounts" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ id, title, desc, time, price, rating, img, discount }) => (
            <div
              key={id}
              onClick={() =>
                router.push(`/${country}/${language}/restaurants/${id}`)
              }
              className="cursor-pointer"
            >
              <FoodCard
                key={title + "homechef"}
                title={title}
                desc={desc}
                time={time}
                price={`${currency}. ${price.replace(/[^0-9]/g, "")}`}
                rating={rating}
                img={img}
                discount={discount ?? ""}
                currency={currency}
              />
            </div>
          )
        )}
      </HorizontalScroller>

      {/* Pepsi kamaaal kravings */}
      <SectionTitle title="Pepsi kamaaal kravings" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ id, title, desc, time, price, rating, img, discount }) => (
            <div
              key={id}
              onClick={() =>
                router.push(`/${country}/${language}/restaurants/${id}`)
              }
              className="cursor-pointer"
            >
              <FoodCard
                key={title + "pepsi"}
                title={title}
                desc={desc}
                time={time}
                price={`${currency}. ${price.replace(/[^0-9]/g, "")}`}
                rating={rating}
                img={img}
                discount={discount ?? ""}
                currency={currency}
              />
            </div>
          )
        )}
      </HorizontalScroller>
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

const FoodCard: React.FC<{
  title: string;
  desc: string;
  time: string;
  price: string;
  currency: any;
  rating: number;
  img: string;
  discount: string;
}> = ({ title, desc, time, price, rating, img, discount, currency }) => (
  <div className="min-w-[220px] bg-[#E8F4F1] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition relative">
    <img
      src={img}
      alt={title}
      className="w-full h-36 rounded-t-lg object-cover"
      loading="lazy"
    />
    <div className="absolute top-2 left-2 bg-[#0B5D4E] text-[#E8F4F1] text-xs px-2 py-1 rounded font-semibold">
      {discount}
    </div>
    <div className="p-4">
      <h4 className="text-[#2C2C2C] font-semibold text-lg truncate">{title}</h4>
      <p className="text-gray-700 text-sm">{desc}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>{time}</span>
        <span>{`${currency}. ${price.replace(/[^0-9]/g, "")}`}</span>
      </div>
      <div className="mt-2 flex items-center gap-1 text-yellow-500 font-semibold">
        {"★".repeat(Math.floor(rating))}
        {rating % 1 ? "½" : ""}
        <span className="text-gray-500 text-sm ml-1">{rating.toFixed(1)}</span>
      </div>
    </div>
  </div>
);

export default Home;
