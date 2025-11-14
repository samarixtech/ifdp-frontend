import React, { useState } from 'react';
import { XIcon, SearchIcon, StarIcon } from 'lucide-react'; 

// --- Filter Section ---
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}
const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
  <div className="border-b border-gray-200 py-6 first:pt-0 last:border-b-0">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

// --- Filter Item ---
interface FilterItemProps {
  label: string;
  name: string;
  type: 'radio' | 'checkbox';
  checked: boolean;
  onChange: (value: string) => void;
}
const FilterItem: React.FC<FilterItemProps> = ({ label, name, type, checked, onChange }) => {
  const id = `${name}-${label.replace(/\s/g, '-')}`;
  return (
    <div className="flex items-center mb-3">
      <input
        id={id}
        name={name}
        type={type}
        checked={checked}
        onChange={() => onChange(label)}
        className={`h-5 w-5 border-gray-300 transition duration-150 ease-in-out ${
          type === 'radio' ? 'text-[#003566] focus:ring-blue-500' : 'text-[#003566] rounded focus:ring-blue-500'
        }`}
      />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

// --- Main Sidebar Filters ---
const SidebarFilters: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Relevance');
  const [quickFilters, setQuickFilters] = useState<string[]>(['Ratings 4+']);
  const [offers, setOffers] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [cuisineSearch, setCuisineSearch] = useState('');
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('$$');

  const sortOptions = ['Relevance', 'Fastest delivery', 'Distance', 'Top rated'];
  const quickFilterOptions = ['Ratings 4+', 'Super restaurant'];
  const offerOptions = ['Free delivery', 'Accepts vouchers', 'Deals'];
  const allCuisines = ['American', 'BBQ', 'Beverages', 'Biryani', 'Broast', 'Burgers', 'Cakes & Bakery', 'Chinese', 'Continental', 'Desserts', 'Fast Food', 'Halwa Puri', 'Pizza'];

  const handleToggle = (value: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filteredCuisines = allCuisines.filter(c => c.toLowerCase().includes(cuisineSearch.toLowerCase()));
  const displayedCuisines = showAllCuisines || filteredCuisines.length <= 8 ? filteredCuisines : filteredCuisines.slice(0, 8);

  const sidebarContent = (
    <div className="p-6 text-black lg:sticky lg:top-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden lg:block">Filters</h1>

      {/* Mobile Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b lg:hidden">
        <h1 className="text-xl font-bold text-gray-900">Filters</h1>
        <button onClick={() => setIsMobileOpen(false)} className="text-gray-500 hover:text-gray-900">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Sort By */}
      <FilterSection title="Sort by">
        {sortOptions.map((option) => (
          <FilterItem
            key={option}
            label={option}
            name="sort-by"
            type="radio"
            checked={sortBy === option}
            onChange={setSortBy}
          />
        ))}
      </FilterSection>

      {/* Quick Filters */}
      <FilterSection title="Quick filters">
        <div className="flex flex-wrap gap-2">
          {quickFilterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => handleToggle(filter, quickFilters, setQuickFilters)}
              className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-150 ${
                quickFilters.includes(filter)
                  ? 'bg-[#003566] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter === 'Super restaurant' && <StarIcon className="w-4 h-4 mr-1 text-blue-400" />}
              {filter}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Offers */}
      <FilterSection title="Offers">
        {offerOptions.map((offer) => (
          <FilterItem
            key={offer}
            label={offer}
            name="offers"
            type="checkbox"
            checked={offers.includes(offer)}
            onChange={(val) => handleToggle(val, offers, setOffers)}
          />
        ))}
      </FilterSection>

      {/* Cuisines */}
      <FilterSection title="Cuisines">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cuisines"
            value={cuisineSearch}
            onChange={(e) => setCuisineSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="max-h-56 overflow-y-auto pr-2">
          {displayedCuisines.map((cuisine) => (
            <FilterItem
              key={cuisine}
              label={cuisine}
              name="cuisines"
              type="checkbox"
              checked={cuisines.includes(cuisine)}
              onChange={(val) => handleToggle(val, cuisines, setCuisines)}
            />
          ))}
        </div>

        {filteredCuisines.length > 8 && (
          <button
            onClick={() => setShowAllCuisines(prev => !prev)}
            className="mt-2 text-sm text-[#003566] hover:text-blue-800 font-semibold transition"
          >
            {showAllCuisines ? 'Show less' : 'Show more'}
          </button>
        )}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="flex space-x-2">
          {['$', '$$', '$$$'].map((price) => (
            <button
              key={price}
              onClick={() => setPriceRange(price)}
              className={`flex-1 px-4 py-2 text-sm font-bold rounded-lg transition-colors duration-150 border-2 ${
                priceRange === price
                  ? 'bg-[#003566] text-white border-[#003566] shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {price}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Mobile Apply/Reset */}
      <div className="lg:hidden mt-6 pt-4 border-t border-gray-200 flex space-x-3 sticky bottom-0 bg-white shadow-2xl p-4 -mx-4 -mb-4">
        <button className="flex-1 px-4 py-3 bg-[#003566] text-white font-bold rounded-lg hover:bg-blue-700 transition">
          Apply Filters
        </button>
        <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition">
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed right-4 bottom-4 z-40 lg:hidden p-4 bg-[#003566] text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Open Filters"
      >
        Filters
      </button>

      {/* Desktop Sidebar */}
      <aside className=" bg-white hidden lg:block lg:w-72 lg:shrink-0 lg:pr-8 sticky top-40 h-[calc(100vh-160px)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Off-Canvas */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileOpen(false)}
        ></div>
        <div
          className={`absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
