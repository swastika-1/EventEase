import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    const role = payload.role;

    if (role === 'organizer' || role === 'admin') {
      return true;
    }

    alert('Access denied. Organizer access required.');

    router.navigate(['/']);
    return false;

  } catch (error) {

    console.error('Invalid token:', error);

    localStorage.removeItem('token');

    router.navigate(['/login']);

    return false;
  }
};