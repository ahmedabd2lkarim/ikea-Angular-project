import { Component, OnInit } from '@angular/core';
import { VendorProfileService } from '../../Services/vendor-profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-profile',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent implements OnInit{
  vendorData:any;
  vendorForm!:FormGroup;
  isEditting:boolean=false;
  constructor(private vendorService:VendorProfileService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.fetchVendorData();
  }

  fetchVendorData()
  {
    this.vendorService.getVendorProfile().subscribe(data=>{
      this.vendorData=data.user;
      this.initForm();   
    })
  }
  initForm()
  {
    this.vendorForm=this.fb.group({
      name:[this.vendorData.name,[Validators.required]],
      email:[this.vendorData.email,[Validators.required]],
      mobile:[this.vendorData.mobileNumber,[Validators.required]],
      storeName:[this.vendorData.storeName,[Validators.required]],
      storeAddress:[this.vendorData.storeAddress,[Validators.required]],
      currentPass:[''],
      newPass:['']
    })
  }

  toggleEdit()
  {
    this.isEditting=!this.isEditting;
  }

  updateData()
  {
    const newData={...this.vendorForm.value}
    if(!newData.currentPass)delete newData.currentPass
    if(!newData.newPass)delete newData.newPass
    console.log(newData);
    
    this.vendorService.updateVendorProfile(newData).subscribe(
      ()=>{
        alert('Profile updated successfully!');
        this.isEditting=false;
        this.fetchVendorData();
      }
    )    
  }
}
