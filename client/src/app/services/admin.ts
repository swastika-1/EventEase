import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard`
    );
  }

}