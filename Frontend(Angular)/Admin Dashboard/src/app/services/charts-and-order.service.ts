import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/cart';
  private apiUrl2 = 'http://localhost:5000/api/dashboard/get-details';

  private dashboard = 'http://localhost:5000/api/dashboard';
  private adminUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); 
    console.log(token);
    
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getAllOrders(): Observable<any> {

    console.log(this.http.get(`${this.apiUrl2}`, this.getHeaders()));
    
    
    return this.http.get(`${this.apiUrl2}`, this.getHeaders());
  }

  updateOrderStatus(orderId: string, status: { status: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/status/${orderId}`, status, this.getHeaders());
  }
  getTotalRevenue(): Observable<any> {

    return this.http.get(`${this.dashboard}/total-revenue`, this.getHeaders());
  }
  getUserCount(): Observable<any> {
    return this.http.get(`${this.dashboard}/user-count`, this.getHeaders());
  }
  getRevenueTrends(): Observable<any> {
    return this.http.get(`${this.dashboard}/get-revenue`, this.getHeaders());
  }
  getCategoryProductCounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dashboard}/product-counts`, this.getHeaders());
  }

  getAdminDetails(): Observable<any> {
    return this.http.get(`http://localhost:5000/api/auth/profile` , this.getHeaders());
  }

  updateAdminProfile(adminData: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/api/dashboard/update-Admin`, adminData , this.getHeaders());
  }
}
