import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ApartmentService } from '../../services/apartment.service';
import { AuthService } from '../../services/auth.service';
import { Apartment } from '../../models/apartment.model';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePost {

  propertyType = '';
  propertyName = '';

  sharedProperty = false;

  location = '';

  squareFeet = 0;

  stayType = '';

  expectedRent = 0;

  negotiable = false;

  priceMode = '';

  furnished = false;

  amenities: string[] = [];

  title = '';

  description = '';

  constructor(
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleAmenity(amenity: string): void {

    const index = this.amenities.indexOf(amenity);

    if (index === -1) {

      this.amenities.push(amenity);

    } else {

      this.amenities.splice(index, 1);

    }
  }

createPost(form: NgForm): void {

  if (form.invalid) {
    alert('Please fill all required fields.');
    return;
  }

  const user = this.authService.getCurrentUser();

  if (!user) {
    this.router.navigate(['/login']);
    return;
  }

  const apartment: Apartment = {
    id: Date.now(),
    propertyName: this.propertyName,
    propertyType: this.propertyType,
    sharedProperty: this.sharedProperty,
    location: this.location,
    squareFeet: this.squareFeet,
    stayType: this.stayType,
    expectedRent: this.expectedRent,
    negotiable: this.negotiable,
    priceMode: this.priceMode,
    furnished: this.furnished,
    amenities: [...this.amenities],
    title: this.title,
    description: this.description,
    ownerEmail: user.email
  };

  this.apartmentService.addApartment(apartment);

  alert('Apartment posted successfully!');

  this.router.navigate(['/']);
}
}