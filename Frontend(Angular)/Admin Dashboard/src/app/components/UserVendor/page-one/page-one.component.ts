import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOneService } from '../../../services/page-one.service';

@Component({
  selector: 'app-page-one',
  standalone: true,
  templateUrl: './page-one.component.html',
  styleUrl: './page-one.component.scss',
  providers: [PageOneService],
  imports: [CommonModule, FormsModule], 
})
export class PageOneComponent {
  users: any[] = [];
  vendors: any[] = [];
  token: string | null = null;
  
  selectedUser: any = null; 
  selectedVendor: any = null;
  searchText: string = '';
  filterType: string = 'all';
  
  filteredUsers: any[] = [];
  filteredVendors: any[] = [];
  searchQuery: string = '';

  constructor(private pageOneService: PageOneService) {}

  login() {
    this.pageOneService.login('admin11@example.com', 'admin1').subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.token = response.token;
        localStorage.setItem('token', this.token!);
      },
      (error) => console.error('Login error:', error)
    );
  }

  getUsers() {
    this.pageOneService.getAllUsers().subscribe(
      (data) => {
        this.users = data.users;
        this.filteredUsers = [...this.users];
      },
      (error) => console.error('Error fetching users:', error)
    );
  }
  

  getVendors() {
    this.pageOneService.getAllVendors().subscribe(
      (data) => {
        this.vendors = data.vendors;
        this.filteredVendors = [...this.vendors];
      },
      (error) => console.error('Error fetching vendors:', error)
    );
  }
  

  deleteUser(userId: string) {
    this.pageOneService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted:', response);
        this.getUsers();
      },
      (error) => console.error('Error deleting user:', error)
    );
  }

  deleteVendor(vendorId: string) {
    this.pageOneService.deleteVendor(vendorId).subscribe(
      (response) => {
        console.log('Vendor deleted:', response);
        this.getVendors();
      },
      (error) => console.error('Error deleting vendor:', error)
    );
  }

  toggleDropdown(user: any) {
    if (this.selectedUser && this.selectedUser._id === user._id) {
      this.closeDropdown();
    } else {
      this.selectedUser = { ...user };
    }
  }

  closeDropdown() {
    this.selectedUser = null;
  }

  toggleDropdownv(vendor: any) {
    if (this.selectedVendor && this.selectedVendor._id === vendor._id) {
      this.closeDropdownv();
    } else {
      this.selectedVendor = { ...vendor };
    }
  }
  
  closeDropdownv() {
    this.selectedVendor = null;
  }

  updateUser() {
    if (!this.selectedUser) return;

    const userId = this.selectedUser._id;
    const updatedData = {
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      mobileNumber: this.selectedUser.mobileNumber,
      homeAddress: this.selectedUser.homeAddress
    };

    this.pageOneService.updateUser(userId, updatedData).subscribe(
      (response) => {
        console.log('User updated:', response);
        this.getUsers();
        this.closeDropdown();
      },
      (error) => console.error('Error updating user:', error)
    );
  }

  updateVendor() {
    if (!this.selectedVendor) return;
  
    const vendorId = this.selectedVendor._id;
    const updatedData = {
      name: this.selectedVendor.name,
      email: this.selectedVendor.email,
      mobileNumber: this.selectedVendor.mobileNumber,
      storeName: this.selectedVendor.storeName,
      storeAddress: this.selectedVendor.storeAddress,
    };
  
    this.pageOneService.updateVendor(vendorId, updatedData).subscribe(
      (response) => {
        console.log('Vendor updated:', response);
        this.getVendors();
        this.closeDropdownv();
      },
      (error) => console.error('Error updating vendor:', error)
    );
  }

  acceptVendor(vendorId: string) {
    this.pageOneService.acceptVendor(vendorId).subscribe(
      (response) => {
        console.log('Vendor accepted:', response);
        this.getVendors();
      },
      (error) => console.error('Error accepting vendor:', error)
    );
  }

 
  
  filterList() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.homeAddress.toLowerCase().includes(this.searchText.toLowerCase())
    );
  
    this.filteredVendors = this.vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vendor.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vendor.storeName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
}
