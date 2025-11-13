import React from 'react';
import { SimilarRestaurant } from '@/types/menu'; 
import SimilarRestaurantCard from './SimilarRestaurantCard';
import HorizontalScroller from './HorizontalScroller';

interface SimilarRestaurantsSectionProps {
    restaurants: SimilarRestaurant[];
}

const SimilarRestaurantsSection: React.FC<SimilarRestaurantsSectionProps> = ({ restaurants }) => {
    if (restaurants.length === 0) return null;

    return (
        <section className="mt-12 mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 px-4 sm:px-0">Similar restaurants</h2>
            <HorizontalScroller>
                {restaurants.map(restaurant => (
                    <SimilarRestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </HorizontalScroller>
        </section>
    );
};

export default SimilarRestaurantsSection;