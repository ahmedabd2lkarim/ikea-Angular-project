import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { VendorProfileService } from '../../Services/vendor-profile.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  vendorName:string='';
  constructor(private vendorService:VendorProfileService ){}

  ngOnInit(): void {
   this.fetchVendorData()
  }

  fetchVendorData()
  {
    this.vendorService.getVendorProfile().subscribe(data=>{
      this.vendorName=data.user.name;   
    })
  }
  logout() {
    localStorage.removeItem('token');
    window.location.href = '';
  }
}
