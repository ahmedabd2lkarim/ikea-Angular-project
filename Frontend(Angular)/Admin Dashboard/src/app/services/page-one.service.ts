import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageOneService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllVendors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/vendors`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete-user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }
  

  deleteVendor(vendorId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete-user/${vendorId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/update-user/${userId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateVendor(vendorId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/update-user/${vendorId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }
  
  acceptVendor(vendorId: string) {
    const token = localStorage.getItem('token'); 
    return this.http.patch(
      `${this.apiUrl}/admin/accept-vendor/${vendorId}`,
      { isAccepted: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  
  
  
}
