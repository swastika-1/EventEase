import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  users: any[] = [];
  events: any[] = [];

  totalUsers = 0;
  totalOrganizers = 0;
  totalEvents = 0;
  totalBookings = 0;

  loading = true;
  error = '';

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.error = '';

    this.adminService.getDashboard().subscribe({

      next: (response: any) => {

        console.log('ADMIN DASHBOARD:', response);

        this.users = response.users || [];
        this.events = response.events || [];

        this.totalUsers =
          response.stats?.totalUsers || 0;

        this.totalOrganizers =
          response.stats?.totalOrganizers || 0;

        this.totalEvents =
          response.stats?.totalEvents || 0;

        this.totalBookings =
          response.stats?.totalBookings || 0;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'ADMIN DASHBOARD ERROR:',
          error
        );

        this.error =
          error?.error?.message ||
          'Unable to load admin dashboard.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }
}