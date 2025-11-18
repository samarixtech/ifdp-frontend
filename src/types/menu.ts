
export interface Variation {
    id: string;
    name: string;
    price: number;
    required?: boolean; 
}

export interface AddOn extends Variation {}


export interface MenuItem {
  currency: any;
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isPopular?: boolean;
  isDeal?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface RestaurantData {
  id: string;
  name: string;
  cuisine: string[];
  location: string;
  rating: number;
  deliveryFee: number;
  minOrder: number;
  menu: MenuSection[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface SimilarRestaurant {
    id: string;
    name: string;
    rating: number;
    ratingCount: number; 
    deliveryTime: string; 
    deliveryFee: number; 
    cuisine: string[];
    imageUrl: string;
    promoText?: string; 
}


export interface CartItem {
    id: string; 
    productId: string; 
    name: string;
    quantity: number;
    price: number; 
    imageUrl: string;
    description: string; 
}