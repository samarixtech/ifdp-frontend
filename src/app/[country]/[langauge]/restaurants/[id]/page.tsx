"use client";

import React, { useState, useMemo } from "react";
import { MenuItem, MenuSection, RestaurantData, CartItem, SimilarRestaurant } from "../../../../../types/menu";
import MenuItemCard from "../../../../../components/MenuItemCard";
import CartSidebar from "../../../../../components/CartSidebar";
import HorizontalScroller from "../../../../../components/HorizontalScroller";
import { Search, ShoppingBag, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import ProductModal from "../../../../../components/ProductModal"; // Make sure this exists
import SimilarRestaurantsSection from "@/components/SimilarRestaurant";
import Header from "../Header";

// --- MOCK DATA ---
const mockRestaurantData: RestaurantData = {
  id: "F8",
  name: "Subway - F8",
  cuisine: ["Sandwiches", "American", "Healthy Food", "Western"],
  location: "Islamabad",
  rating: 4.5,
  deliveryFee: 129,
  minOrder: 149,
  menu: [
    {
      title: "Popular",
      items: [
        { id: "1", name: "Cookie", price: 80, description: "Soft and chewy cookies.", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: true },
        { id: "2", name: "Chicken Teriyaki", price: 860, description: "Teriyaki sauce pickle your taste buds.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: true },
        { id: "3", name: "Roasted Chicken Breast", price: 730, description: "Tender chicken patty on bread.", imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: true },
        { id: "4", name: "Chicken Fajita", price: 805, description: "Savory strips tossed in fajita seasoning.", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: true },
        { id: "5", name: "Chicken Tikka", price: 805, description: "All-time favorite Chicken Tikka.", imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: true },
      ] as MenuItem[],
    },
    {
      title: "Cricket Deals",
      items: [
        { id: "7", name: "Cricket Deal 2", price: 699, description: "Enjoy Chicken Sub (Selected Flavor).", imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: false, isDeal: true },
      ] as MenuItem[],
    },
    {
      title: "Sandwiches",
      items: [
        { id: "9", name: "Veggie Delite", price: 580, description: "Healthy veggie bouquet.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", isPopular: false },
      ] as MenuItem[],
    },
  ],
};

const topMenuTabs = [
  "Popular (5)",
  "Cricket Deals (1)",
  "Dil Dil Pepsi Deals (1)",
  "All New Mini Sub (1)",
  "Celebration Deals & Discounts (2)",
  "Sandwiches (10)",
];

interface DynamicParams {
  country: string;
  langauge: string;
  id: string;
  [key: string]: string | string[] | undefined;
}

// --- FoodCard for Deals ---
const FoodCard: React.FC<{ item: MenuItem; onAddItem: (item: MenuItem) => void; onClick?: () => void }> = ({ item, onAddItem, onClick }) => (
  <div
    onClick={onClick}
    className="w-60 flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-2xl transition duration-300"
  >
    <div className="h-36 relative">
      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
      {item.isDeal && <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">DEAL</div>}
    </div>
    <div className="p-4 flex flex-col justify-between h-40">
      <div>
        <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-lg font-bold text-green-600">Rs. {item.price.toLocaleString()}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddItem(item);
          }}
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          aria-label={`Add ${item.name} to cart`}
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </div>
  </div>
);
const mockSimilarRestaurants: SimilarRestaurant[] = [
    {
        id: "H1", name: "Hardee's - Centaurus", rating: 4.8, ratingCount: 3000,
        deliveryTime: "45 min", deliveryFee: 189, cuisine: ["Fast Food", "Burgers"],
        imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", promoText: "20% off Rs. 199"
    },
    {
        id: "Q1", name: "Quattro Uno", rating: 4.5, ratingCount: 1100,
        deliveryTime: "45 min", deliveryFee: 189, cuisine: ["Pizza", "Italian", "Desserts"],
        imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", promoText: "20% off Rs. 199"
    },
    {
        id: "R1", name: "RUSTIC", rating: 4.7, ratingCount: 97,
        deliveryTime: "45 min", deliveryFee: 189, cuisine: ["Steak", "Burgers", "In-Store Prices"],
        imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", promoText: "20% off Rs. 199"
    },
    {
        id: "B1", name: "BRIM Burgers", rating: 4.6, ratingCount: 100,
        deliveryTime: "45 min", deliveryFee: 189, cuisine: ["Burgers", "In-Store Prices"],
        imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", promoText: "25% off Rs. 199"
    },
    {
        id: "C1", name: "BABES HOT CHICKEN", rating: 4.3, ratingCount: 120,
        deliveryTime: "45 min", deliveryFee: 189, cuisine: ["Fast Food", "Fried Chicken"],
        imageUrl: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", promoText: "20% off Rs. 199"
    },
];
export default function RestaurantPage() {
  const params = useParams<DynamicParams>();
  const restaurant = mockRestaurantData;

  const [activeTab, setActiveTab] = useState("Popular (5)");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allMenuItems = useMemo(() => restaurant.menu.flatMap((section) => section.items), [restaurant.menu]);

  // --- Cart Functions ---
  const handleAddItem = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      return existing
        ? prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) =>
      newQuantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${cart.length} items!`);
  };

  // --- Modal Functions ---
  const handleMenuItemClick = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setIsModalOpen(true);
  };

  const handleAddItemWithCustomization = (item: MenuItem) => {
    handleAddItem(item);
    setIsModalOpen(false);
  };

  const handleSimpleAddItem = (item: MenuItem) => handleAddItem(item);

  // --- Filtering ---
  const filteredMenu = useMemo(() => {
    const cleanTab = activeTab.split("(")[0].trim();
    const section = restaurant.menu.find((s) => s.title.startsWith(cleanTab));
    if (!section) return [];
    return section.items.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm, restaurant.menu]);

  return (
    <div className="min-h-screen bg-gray-50">
        

      <Header />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-sm text-gray-500 hidden md:block md:pt-20">
        {(params.country as string)?.toUpperCase() || "COUNTRY"} &gt; {(params.langauge as string)?.toUpperCase() || "LANGUAGE"} &gt; Restaurant List &gt;{" "}
        <span className="font-semibold">{restaurant.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Restaurant Info */}
        <div className="flex items-start pb-4">
          <img
            src="/images/subway-logo.png"
            alt="Subway Logo"
            className="w-24 h-24 rounded-full mr-4 object-cover ring-4 ring-green-100 shadow-md"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{restaurant.name}</h1>
            <p className="text-base text-gray-600 mt-1">{restaurant.cuisine.join(" • ")}</p>
            <div className="flex items-center text-sm text-gray-500 mt-3 space-x-6">
              <span className="flex items-center text-green-600 font-semibold">★ {restaurant.rating.toFixed(1)} Rating</span>
              <span className="flex items-center">
                <ShoppingBag size={14} className="mr-1" /> Rs. {restaurant.deliveryFee} delivery fee
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" /> 30 Min
              </span>
            </div>
          </div>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* Tabs */}
        <div className="sticky top-0 bg-white z-10 py-3 border-b border-gray-200 shadow-sm">
          <HorizontalScroller>
            {topMenuTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchTerm("");
                }}
                className={`py-2 px-4 text-sm font-medium rounded-xl transition duration-150 whitespace-nowrap ${
                  tab === activeTab ? "bg-green-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </HorizontalScroller>
        </div>

        {/* Search */}
        <div className="mt-6 flex items-center space-x-2 bg-white rounded-xl p-2 border border-gray-200 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search menu items..."
            className="w-full outline-none text-gray-700 placeholder-gray-400 px-2 py-2 rounded-lg"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 mt-6">
          {/* Menu */}
          <div className="lg:w-8/12 xl:w-9/12">
            {activeTab.includes("Deals") || activeTab.includes("Mini Sub") ? (
              <HorizontalScroller>
                {filteredMenu.map((item) => (
                  <FoodCard key={item.id} item={item} onAddItem={handleSimpleAddItem} onClick={() => handleMenuItemClick(item)} />
                ))}
              </HorizontalScroller>
            ) : (
              <div className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-xl shadow-lg">
                {filteredMenu.length > 0 ? (
                  filteredMenu.map((item) => (
                    <MenuItemCard key={item.id} item={item} onItemClick={handleMenuItemClick} onAddItem={handleSimpleAddItem} />
                  ))
                ) : (
                  <p className="p-6 text-center text-gray-500">No items found.</p>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="lg:w-4/12 xl:w-3/12 mt-8 lg:mt-0">
            <CartSidebar cart={cart} onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
          </div>
        </div>
               
            <div className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-4 lg:px-4">
                    <SimilarRestaurantsSection restaurants={mockSimilarRestaurants} />
                </div>
            </div>


        {/* Product Modal */}
        {selectedItemForModal && (
          <ProductModal
            item={selectedItemForModal}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddToCart={handleAddItemWithCustomization}
          />
        )}
      </div>
    </div>
  );
}
