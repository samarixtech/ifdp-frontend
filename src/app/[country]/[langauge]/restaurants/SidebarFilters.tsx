import React, { useState } from "react";
import { XIcon, SearchIcon, ClockIcon } from "lucide-react";

const Section = ({ title, children }: any) => (
  <div className="pb-8 mb-8 border-b border-gray-200 last:border-none">
    <h2 className="text-xl font-semibold text-gray-900 mb-5 tracking-wide">
      {title}
    </h2>
    {children}
  </div>
);

const FilterItem = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 accent-[#0B5D4E] transition-all group-hover:scale-110"
    />
    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition">
      {label}
    </span>
  </label>
);

const Pill = ({ active, children, onClick }: any) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-semibold border shadow-sm
      transition-all hover:shadow-md 
      ${
        active
          ? "bg-[#0B5D4E] text-white border-[#0B5D4E]"
          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
      }
    `}
  >
    {children}
  </button>
);

const Slider = ({ value, setValue, max, step }: any) => (
  <div className="mt-3">
    <input
      type="range"
      min="0"
      max={max}
      step={step}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full accent-[#0B5D4E]"
    />
    <div className="text-sm text-gray-600 mt-1">{value}</div>
  </div>
);

const SidebarFilters = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [sortBy, setSortBy] = useState("Relevance");
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [cuisineSearch, setCuisineSearch] = useState("");
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [price, setPrice] = useState("$$");
  const [rating, setRating] = useState(4);
  const [deliveryTime, setDeliveryTime] = useState("Any");
  const [distance, setDistance] = useState(5);

  const allCuisines = [
    "American",
    "Biryani",
    "BBQ",
    "Beverages",
    "Chinese",
    "Pizza",
    "Broast",
    "Fast Food",
    "Halwa Puri",
    "Desserts",
    "Burgers",
  ];

  const quickOptions = [
    "Trending",
    "Popular",
    "Top Rated",
    "New",
    "Nearby",
    "Pure Veg",
    "Halal",
  ];

  const offerOptions = [
    "Free Delivery",
    "Deals",
    "Voucher Accepted",
    "Buy 1 Get 1",
  ];

  const resetAll = () => {
    setSortBy("Relevance");
    setQuickFilters([]);
    setOffers([]);
    setCuisineSearch("");
    setCuisines([]);
    setPrice("$$");
    setRating(4);
    setDeliveryTime("Any");
    setDistance(5);
  };

  // --------------------------------------------------------------------
  // MAIN CONTENT (fixed height for mobile)
  // --------------------------------------------------------------------
  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* HEADER (Mobile Only) */}
      <div className="flex justify-between items-center lg:hidden p-4 border-b">
        <h1 className="text-xl font-bold">Filters</h1>
        <button onClick={() => setIsOpen(false)}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* SCROLL CONTENT */}
      <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
        {/* Sort */}
        <Section title="Sort by">
          <div className="flex flex-col gap-3">
            {["Relevance", "Fastest", "Top Rated", "Nearest"].map((o) => (
              <label key={o} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={sortBy === o}
                  onChange={() => setSortBy(o)}
                  name="sort"
                  className="accent-[#0B5D4E]"
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* Quick */}
        <Section title="Quick Filters">
          <div className="flex flex-wrap gap-2">
            {quickOptions.map((q) => (
              <Pill
                key={q}
                active={quickFilters.includes(q)}
                onClick={() =>
                  setQuickFilters((prev) =>
                    prev.includes(q)
                      ? prev.filter((x) => x !== q)
                      : [...prev, q]
                  )
                }
              >
                {q}
              </Pill>
            ))}
          </div>
        </Section>

        {/* Offers */}
        <Section title="Offers">
          <div className="flex flex-col gap-3">
            {offerOptions.map((o) => (
              <FilterItem
                key={o}
                label={o}
                checked={offers.includes(o)}
                onChange={() =>
                  setOffers((prev) =>
                    prev.includes(o)
                      ? prev.filter((x) => x !== o)
                      : [...prev, o]
                  )
                }
              />
            ))}
          </div>
        </Section>

        {/* Rating */}
        <Section title="Minimum Rating">
          <Slider value={rating} setValue={setRating} max={5} step={0.1} />
        </Section>

        {/* Delivery Time */}
        <Section title="Delivery Time">
          <div className="flex gap-2 flex-wrap">
            {["Any", "15-30 mins", "30-45 mins", "45-60 mins"].map((t) => (
              <Pill
                key={t}
                active={deliveryTime === t}
                onClick={() => setDeliveryTime(t)}
              >
                <ClockIcon className="w-4 h-4 inline-block mr-1" />
                {t}
              </Pill>
            ))}
          </div>
        </Section>

        {/* Distance */}
        <Section title="Distance (km)">
          <Slider value={distance} setValue={setDistance} max={20} step={1} />
        </Section>

        {/* Cuisines */}
        <Section title="Cuisines">
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-[#0B5D4E] border-gray-300"
              placeholder="Search..."
              value={cuisineSearch}
              onChange={(e) => setCuisineSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 max-h-48 overflow-y-auto scrollbar-hide">
            {allCuisines
              .filter((c) =>
                c.toLowerCase().includes(cuisineSearch.toLowerCase())
              )
              .map((c) => (
                <FilterItem
                  key={c}
                  label={c}
                  checked={cuisines.includes(c)}
                  onChange={() =>
                    setCuisines((prev) =>
                      prev.includes(c)
                        ? prev.filter((x) => x !== c)
                        : [...prev, c]
                    )
                  }
                />
              ))}
          </div>
        </Section>

        {/* Price */}
        <Section title="Price">
          <div className="flex gap-2">
            {["$", "$$", "$$$"].map((p) => (
              <Pill key={p} active={price === p} onClick={() => setPrice(p)}>
                {p}
              </Pill>
            ))}
          </div>
        </Section>
      </div>

      {/* UNIVERSAL APPLY + RESET BUTTONS (DESKTOP + MOBILE BOTH) */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        <div className="flex gap-3">
          <button
            onClick={resetAll}
            className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 bg-[#0B5D4E] text-white rounded-lg font-semibold shadow hover:bg-[#08483C]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-50 p-4 bg-[#0B5D4E] text-white rounded-full shadow-lg lg:hidden"
      >
        Filters
      </button>

      {/* DESKTOP SIDEBAR */}
      <aside className=" hidden lg:block w-80 p-2 h-[calc(100vh-150px)] sticky top-36 overflow-hidden">
        <div className="rounded-2xl shadow-xl h-full overflow-hidden bg-[#E8F4F1]">
          {SidebarContent}
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/40"
        ></div>

        <div
          className={`absolute left-0 top-0 h-full w-[310px] bg-white rounded-r-xl shadow-xl 
            transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {SidebarContent}
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
