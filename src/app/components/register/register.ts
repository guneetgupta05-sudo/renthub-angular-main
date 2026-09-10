import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    const success = this.authService.register(
      this.name,
      this.email,
      this.password
    );

    if (success) {

      this.successMessage =
        'Registration successful! Please login.';

      this.name = '';
      this.email = '';
      this.password = '';

    } else {

      this.errorMessage =
        'An account with this email already exists.';

    }
  }
}