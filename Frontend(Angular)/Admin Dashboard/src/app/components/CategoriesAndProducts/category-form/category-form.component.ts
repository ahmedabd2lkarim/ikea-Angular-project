import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: string | null = null;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9 ]*$'),
        ],
      ],
      image: ['', [Validators.required, Validators.pattern('(https?://.*)')]],
    });

    if (this.categoryId) {
      this.loadCategory();
    }
  }

  loadCategory(): void {
    if (!this.categoryId) return;

    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (data) => {
        this.categoryForm.patchValue(data);
      },
      error: () => {
        this.message = 'Category not found or deleted!';
        this.router.navigate(['/categories']);
      },
    });
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) return;

    if (this.categoryId) {
      this.categoryService
        .updateCategory(this.categoryId, this.categoryForm.value)
        .subscribe({
          next: () => {
            this.message = 'Category updated successfully!';
            setTimeout(() => this.router.navigate(['/categories']), 2000);
          },
          error: () => {
            this.message = 'Failed to update category!';
          },
        });
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: () => {
          this.message = 'Category added successfully!';
          setTimeout(() => this.router.navigate(['/categories']), 2000);
        },
        error: () => {
          this.message = 'Failed to add category!';
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }

  get name() {
    return this.categoryForm.get('name');
  }

  get image() {
    return this.categoryForm.get('image');
  }
}
