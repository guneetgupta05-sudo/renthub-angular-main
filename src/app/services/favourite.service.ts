import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favourites: number[] = [];

  constructor() {
    const savedFavourites = localStorage.getItem('renthub_favourites');

    if (savedFavourites) {
      this.favourites = JSON.parse(savedFavourites);
    }
  }

  addFavourite(apartmentId: number): void {
    if (!this.favourites.includes(apartmentId)) {
      this.favourites.push(apartmentId);

      localStorage.setItem(
        'renthub_favourites',
        JSON.stringify(this.favourites)
      );
    }
  }

  removeFavourite(apartmentId: number): void {
    this.favourites = this.favourites.filter(
      id => id !== apartmentId
    );

    localStorage.setItem(
      'renthub_favourites',
      JSON.stringify(this.favourites)
    );
  }

  isFavourite(apartmentId: number): boolean {
    return this.favourites.includes(apartmentId);
  }

  getFavourites(): number[] {
    return this.favourites;
  }
}