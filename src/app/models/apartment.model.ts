export interface Apartment {
  id: number;
  propertyName: string;
  propertyType: string;
  sharedProperty: boolean;
  location: string;
  squareFeet: number;
  stayType: string;
  expectedRent: number;
  negotiable: boolean;
  priceMode: string;
  furnished: boolean;
  amenities: string[];
  title: string;
  description: string;
  ownerEmail: string;
}