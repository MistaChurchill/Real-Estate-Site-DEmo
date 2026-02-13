export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  imageUrls?: string[];
  tag: string;
  listingType: 'sale' | 'rent' | 'land';
  isNew?: boolean;
  isPopular?: boolean;
  dateAdded?: string; // ISO date string
  developer?: {
    name: string;
    logoUrl: string;
  };
  landmarks?: {
    name: string;
    distance: string;
    type: string;
  }[];
  documents?: {
    title: string;
    type: 'pdf' | 'doc';
    size: string;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  HOME = 'home',
  LISTINGS = 'listings',
  ABOUT = 'about',
  CONTACT = 'contact',
  AI_AGENT = 'ai-agent',
  BLOG = 'blog'
}