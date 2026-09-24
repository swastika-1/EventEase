import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login() {

    this.auth.login(this.email, this.password).subscribe({

      next: (response) => {

       console.log('Login successful:', response);

       this.auth.saveToken(response.token);

       this.router.navigate(['/']);

      },

      error: (error) => {

        console.error('Login failed:', error);

      }

    });

  }

}