import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/charts-and-order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class AdminProfileComponent implements OnInit {
  adminForm!: FormGroup;
  adminData: any;
  isLoading = true;
  isEditing = false;

  constructor(private fb: FormBuilder, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData() {
    this.orderService.getAdminDetails().subscribe(
      (res) => {
        this.adminData = res.user;
        this.initForm();
        this.isLoading = false;
      },
      (err) => {
        console.error('Error fetching admin data', err);
        this.isLoading = false;
      }
    );
  }

  initForm() {
    this.adminForm = this.fb.group({
      name: [this.adminData?.name || '', Validators.required],
      email: [this.adminData?.email || '', [Validators.required, Validators.email]],
      mobileNumber: [this.adminData?.mobileNumber || '', Validators.required],
      homeAddress: [this.adminData?.homeAddress || '', Validators.required],
      currentPassword: [''],
      newPassword: ['']
    });
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  updateProfile() {
    if (this.adminForm.valid) {
      const updatedData = { ...this.adminForm.value };

      if (!updatedData.currentPassword) delete updatedData.currentPassword;
      if (!updatedData.newPassword) delete updatedData.newPassword;

      this.orderService.updateAdminProfile(updatedData).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.isEditing = false;
          this.loadAdminData();
        },
        (err) => {
          console.error('Error updating profile', err);
        }
      );
    }
  }
}
