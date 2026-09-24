import { Routes } from '@angular/router';

import { Home } from './home/home';

import { Login } from './login/login';

import { Register } from './register/register';

import { Events } from './events/events';

import { MyBookings } from './my-bookings/my-bookings';

import { OrganizerDashboard } from './organizer-dashboard/organizer-dashboard';

import { CreateEvent } from './create-event/create-event';

import { EditEvent } from './edit-event/edit-event';

import { Attendees } from './attendees/attendees';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';

import { authGuard } from './auth.guard';

import { roleGuard } from './role-guard';

import { adminRoleGuard } from './admin-role-guard';


export const routes: Routes = [

  // Home
  {
    path: '',
    component: Home
  },


  // Authentication
  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },


  // Events
  {
    path: 'events',
    component: Events
  },


  // User bookings
  {
    path: 'my-bookings',
    component: MyBookings,
    canActivate: [authGuard]
  },


  // Admin Dashboard
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminRoleGuard]
  },


  // Organizer Dashboard
  {
    path: 'organizer-dashboard',
    component: OrganizerDashboard,
    canActivate: [roleGuard]
  },


  // Create Event
  {
    path: 'create-event',
    component: CreateEvent,
    canActivate: [roleGuard]
  },


  // Edit Event
  {
    path: 'edit-event/:id',
    component: EditEvent,
    canActivate: [roleGuard]
  },


  // View Attendees
  {
    path: 'attendees/:id',
    component: Attendees,
    canActivate: [roleGuard]
  }

];