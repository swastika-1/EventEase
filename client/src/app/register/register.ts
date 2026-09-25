import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  error = '';
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register(): void {

    this.error = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;

    this.auth.register(
      this.name,
      this.email,
      this.password
    ).subscribe({

      next: (response: any) => {

        console.log('REGISTER SUCCESS:', response);

        alert('Account created successfully! 🎉');

        this.loading = false;

        this.router.navigate(['/login']);
      },

      error: (error) => {

        console.error('REGISTER ERROR:', error);

        this.error =
          error?.error?.message ||
          'Unable to create your account.';

        this.loading = false;
      }

    });

  }

}