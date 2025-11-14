import React from "react";

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

const sampleItems = [
  {
    title: "Karahi & Tikka",
    desc: "Pakistani",
    time: "15-30 min",
    price: "₨.129",
    rating: 4.9,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% off",
  },
  {
    title: "House Of Chilli",
    desc: "Pakistani",
    time: "20-35 min",
    price: "₨.129",
    rating: 4.8,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% cashback",
  },
  {
    title: "Eggspectation Rest.",
    desc: "Continental",
    time: "15-30 min",
    price: "₨.129",
    rating: 5.0,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "10% cashback",
  },
  {
    title: "Fredarios pizza",
    desc: "Pakistani",
    time: "10-25 min",
    price: "₨.129",
    rating: 4.8,
    img: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    discount: "15% off",
  },
];

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-black px-4 md:px-16 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search for restaurants, cuisines, and dishes"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Banner */}
      <div className="relative bg-linear-to-r from-blue-100 to-[#003566] rounded-lg p-6 mb-10 flex items-center shadow-md">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-black max-w-xs">
            Sign up for free delivery on your first order
          </h2>
          <button className="bg-[#003566] text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition">
            Sign up
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1536329639134-ade172b2fea0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          alt="IFDP mascot"
          className="w-36 ml-auto"
          loading="lazy"
        />
      </div>

      {/* Daily Deals */}
      <SectionTitle title="Your daily deals" />
      <HorizontalScroller>
        <DealCard
          title="Up to 30% off!"
          img="https://images.unsplash.com/photo-1536329639134-ade172b2fea0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          desc="Great discounts today!"
        />
        <DealCard
          title="Deal for ₨.1250"
          img="https://images.unsplash.com/photo-1536329639134-ade172b2fea0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
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
            <span className="text-black text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>

      {/* New on IFDP */}
      <SectionTitle title="New on IFDP" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ title, desc, time, price, rating, img, discount }) => (
            <FoodCard
              key={title}
              title={title}
              desc={desc}
              time={time}
              price={price}
              rating={rating}
              img={img}
              discount={discount}
            />
          )
        )}
      </HorizontalScroller>

      {/* Homechefs – khaas discounts */}
      <SectionTitle title="Homechefs – khaas discounts" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ title, desc, time, price, rating, img, discount }) => (
            <FoodCard
              key={title + "homechef"}
              title={title}
              desc={desc}
              time={time}
              price={price}
              rating={rating}
              img={img}
              discount={discount}
            />
          )
        )}
      </HorizontalScroller>

      {/* Pepsi kamaaal kravings */}
      <SectionTitle title="Pepsi kamaaal kravings" />
      <HorizontalScroller>
        {sampleItems.map(
          ({ title, desc, time, price, rating, img, discount }) => (
            <FoodCard
              key={title + "pepsi"}
              title={title}
              desc={desc}
              time={time}
              price={price}
              rating={rating}
              img={img}
              discount={discount}
            />
          )
        )}
      </HorizontalScroller>
    </div>
  );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
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
  <div className="min-w-60 bg-white rounded-lg shadow-md flex items-center gap-4 p-4 cursor-pointer hover:shadow-lg transition">
    <img
      src={img}
      alt={desc}
      className="w-24 h-24 rounded-lg object-cover shrink-0"
      loading="lazy"
    />
    <div>
      <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
      <p className="text-black text-sm mt-1">{desc}</p>
    </div>
  </div>
);

const FoodCard: React.FC<{
  title: string;
  desc: string;
  time: string;
  price: string;
  rating: number;
  img: string;
  discount: string;
}> = ({ title, desc, time, price, rating, img, discount }) => (
  <div className="min-w-[220px] bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition relative">
    <img
      src={img}
      alt={title}
      className="w-full h-36 rounded-t-lg object-cover"
      loading="lazy"
    />
    <div className="absolute top-2 left-2 bg-[#003566] text-white text-xs px-2 py-1 rounded font-semibold">
      {discount}
    </div>
    <div className="p-4">
      <h4 className="text-black font-semibold text-lg truncate">{title}</h4>
      <p className="text-gray-700 text-sm">{desc}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>{time}</span>
        <span>{price}</span>
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
