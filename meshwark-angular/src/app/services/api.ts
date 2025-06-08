import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth'; // To get the token

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7217/api'; // Same as React app

  constructor(private http: HttpClient, private authService: AuthService) { }

  // No need for manual token interceptor here if we set up an HttpInterceptor separately
  // However, for simplicity in this step, we can add headers directly in methods or use an interceptor later.
  // For now, let's assume an interceptor will be added. If not, methods would need to get token and add header.

  // Example: If not using an interceptor immediately
  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.authService.getToken();
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`); // Headers will be added by interceptor
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/update/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  updateDriverTrip(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/updateDriverTrip/${id}`, data);
  }

  getAllDrivers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/drivers`);
  }

  // loginUser and registerUser are in AuthService

  getCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/count`);
  }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/admins`);
  }

  getAllRiders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/riders`);
  }
}
