import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://eventease-production-046d.up.railway.app/api/admin';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard`
    );
  }

}