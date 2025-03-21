import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorProfileService {
  baseURL: string = `${environment.baseURL}/api/auth`;
  constructor(private httpClient: HttpClient) { }

  getHeaders() {
    // const token = localStorage.getItem('token'); 
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2NiZWI1ZWViZDYwMDkzYmI1MGE0ZiIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3NDI1NTU4MzIsImV4cCI6MTc0MjU3MzgzMn0.GPrXCPGZBxwDdPj7gOcB-eQ39HbSGUhgLYISgqC1ovg'; 
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getVendorProfile():Observable<any>{
    return this.httpClient.get(`${this.baseURL}/profile`,this.getHeaders());
  }

  updateVendorProfile(vendorData:any):Observable<any>
  {
    return this.httpClient.patch(`${this.baseURL}/updateVendor`,vendorData,this.getHeaders());
  }
}
