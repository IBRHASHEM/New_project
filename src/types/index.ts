export type Language = 'en' | 'ar';
export type Currency = 'EGP' | 'USD';

export type PropertyType = 'villa' | 'apartment' | 'duplex' | 'penthouse' | 'townhouse' | 'commercial' | 'chalet' | 'office';
export type ListingStatus = 'for-sale' | 'for-rent' | 'off-plan';
export type ProjectStatus = 'under-construction' | 'delivered' | 'launching-soon';

export interface LocationInfo {
  city: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
  mapEmbedUrl?: string;
  nearbyPlaces?: {
    name: string;
    type: 'school' | 'hospital' | 'mall' | 'transport' | 'park';
    distance: string;
  }[];
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  propertiesCount: number;
  languages: string[];
}

export interface Amenity {
  id: string;
  nameEn: string;
  nameAr: string;
  iconName: string;
}

export interface Property {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceEgp: number;
  priceUsd: number;
  type: PropertyType;
  status: ListingStatus;
  isFeatured?: boolean;
  isHot?: boolean;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt?: number;
  finishingType?: string;
  location: LocationInfo;
  images: string[];
  amenities: string[];
  floorPlanUrl?: string;
  videoTourUrl?: string;
  agent: Agent;
  createdAt: string;
  viewsCount: number;
  referenceNumber: string;
  projectId?: string;
}

export interface ProjectUnit {
  type: PropertyType;
  bedrooms: number;
  startingPriceEgp: number;
  startingPriceUsd: number;
  areaSqmMin: number;
  areaSqmMax: number;
  availableCount: number;
}

export interface PaymentPlan {
  downPaymentPercent: number;
  installmentsYears: number;
  deliveryYear: number;
  notesEn?: string;
  notesAr?: string;
}

export interface Project {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  developerEn: string;
  developerAr: string;
  developerLogo?: string;
  location: LocationInfo;
  descriptionEn: string;
  descriptionAr: string;
  startingPriceEgp: number;
  startingPriceUsd: number;
  completionDate: string;
  totalUnits: number;
  availableUnits: number;
  status: ProjectStatus;
  heroImage: string;
  images: string[];
  masterPlanImage?: string;
  units: ProjectUnit[];
  amenities: string[];
  paymentPlans: PaymentPlan[];
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface InquiryForm {
  propertyId?: string;
  projectId?: string;
  agentId?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  viewingDate?: string;
  viewingTime?: string;
  message: string;
  type: 'viewing' | 'brochure' | 'general' | 'listing';
}

export interface PropertyFilterState {
  keyword: string;
  city: string;
  district: string;
  propertyType: PropertyType | 'all';
  status: ListingStatus | 'all';
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minBathrooms: number;
  minArea: number;
  maxArea: number;
  amenities: string[];
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'popularity';
}
