import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { FavouriteService } from '../../services/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  apartments: Apartment[] = [];
featuredApartments: Apartment[] = [];

searchLocation = '';
minRent: number | null = null;
maxRent: number | null = null;

sortOption = '';

filteredApartments: Apartment[] = [];

currentPage = 1;
pageSize = 3;
paginatedApartments: Apartment[] = [];

constructor(
  private apartmentService: ApartmentService,
  private favouriteService: FavouriteService,
  public router: Router
) {}

ngOnInit(): void {
  this.apartments = this.apartmentService.getApartments();

  this.filteredApartments = [...this.apartments];

this.featuredApartments = this.apartments.slice(0, 3);

this.updatePagination();
}

toggleFavourite(apartmentId: number): void {
  if (this.favouriteService.isFavourite(apartmentId)) {
    this.favouriteService.removeFavourite(apartmentId);
  } else {
    this.favouriteService.addFavourite(apartmentId);
  }
}

isFavourite(apartmentId: number): boolean {
  return this.favouriteService.isFavourite(apartmentId);
}

searchApartments(): void {
  this.filteredApartments = this.apartments.filter(apartment => {

    const locationMatch =
      !this.searchLocation ||
      apartment.location
        .toLowerCase()
        .includes(this.searchLocation.toLowerCase());

    const minRentMatch =
      this.minRent === null ||
      apartment.expectedRent >= this.minRent;

    const maxRentMatch =
      this.maxRent === null ||
      apartment.expectedRent <= this.maxRent;

    this.currentPage = 1;
this.updatePagination();

    return locationMatch && minRentMatch && maxRentMatch;
  });
}

sortApartments(): void {
  if (this.sortOption === 'priceLowHigh') {
    this.filteredApartments.sort(
      (a, b) => a.expectedRent - b.expectedRent
    );
  }

  if (this.sortOption === 'priceHighLow') {
    this.filteredApartments.sort(
      (a, b) => b.expectedRent - a.expectedRent
    );
  }

  if (this.sortOption === 'newest') {
    this.filteredApartments.sort(
      (a, b) => b.id - a.id
    );
  }

  this.currentPage = 1;
this.updatePagination();
}

updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.paginatedApartments =
    this.filteredApartments.slice(startIndex, endIndex);
}

get totalPages(): number {
  return Math.ceil(
    this.filteredApartments.length / this.pageSize
  );
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagination();
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePagination();
  }
}
}