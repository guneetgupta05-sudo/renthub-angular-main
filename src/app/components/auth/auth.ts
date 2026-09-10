import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  loginEmail = '';
  loginPassword = '';

  registerName = '';
  registerEmail = '';
  registerPassword = '';

  login(): void {
    console.log('Login:', this.loginEmail, this.loginPassword);
  }

  register(): void {
    console.log(
      'Register:',
      this.registerName,
      this.registerEmail,
      this.registerPassword
    );
  }
}