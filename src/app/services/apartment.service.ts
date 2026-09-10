import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private apartments: Apartment[] = [];

  constructor() {
  const savedApartments =
    localStorage.getItem('renthub_apartments');

  if (savedApartments) {
    this.apartments = JSON.parse(savedApartments);
  } else {
    this.apartments = [
      {
        id: 1,
        propertyName: 'Apartment 1',
        propertyType: 'Apartment',
        sharedProperty: true,
        location: 'Sector 32, Noida',
        squareFeet: 4500,
        stayType: 'Monthly',
        expectedRent: 20000,
        negotiable: false,
        priceMode: 'Per Month',
        furnished: true,
        amenities: ['Swimming Pool', 'Security'],
        title: '4 BHK Apartment in Noida',
        description: 'Spacious 4 BHK apartment in Noida sector 32.',
        ownerEmail: 'owner1@renthub.com'
      },
      {
        id: 2,
        propertyName: 'Apartment 2',
        propertyType: 'Apartment',
        sharedProperty: false,
        location: 'Sector 2, Gurgaon',
        squareFeet: 2000,
        stayType: 'Monthly',
        expectedRent: 30000,
        negotiable: false,
        priceMode: 'Per Month',
        furnished: true,
        amenities: ['Gym/Fitness Center', 'Security'],
        title: '3 BHK Apartment in Gurgaon',
        description: 'Modern apartment with excellent amenities.',
        ownerEmail: 'owner2@renthub.com'
      },
      {
        id: 3,
        propertyName: 'Nort Caps Apartments',
        propertyType: 'Apartment',
        sharedProperty: false,
        location: 'Sector 14, Faridabad',
        squareFeet: 1100,
        stayType: 'Monthly',
        expectedRent: 15000,
        negotiable: false,
        priceMode: 'Per Month',
        furnished: false,
        amenities: ['Security', 'Internet'],
        title: '2 BHK Apartment in faridabad',
        description: 'Comfortable 2 BHK apartment in faridabad.',
        ownerEmail: 'owner3@renthub.com'
      }
    ];

    localStorage.setItem(
      'renthub_apartments',
      JSON.stringify(this.apartments)
    );
  }
}

  getApartments(): Apartment[] {
    return this.apartments;
  }

  addApartment(apartment: Apartment): void {
    this.apartments.push(apartment);

    this.saveApartments();
  }

  getApartmentById(id: number): Apartment | undefined {
    return this.apartments.find(
      apartment => apartment.id === id
    );
  }

  updateApartment(updatedApartment: Apartment): void {
    const index = this.apartments.findIndex(
      apartment => apartment.id === updatedApartment.id
    );

    if (index !== -1) {
      this.apartments[index] = updatedApartment;
      this.saveApartments();
    }
  }

  deleteApartment(id: number): void {
    this.apartments = this.apartments.filter(
      apartment => apartment.id !== id
    );

    this.saveApartments();
  }

  private saveApartments(): void {
    localStorage.setItem(
      'renthub_apartments',
      JSON.stringify(this.apartments)
    );
  }
}