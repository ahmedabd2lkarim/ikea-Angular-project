import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Icategory } from '../../../model/icategory';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategorySearchComponent } from '../category-search/category-search.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [CommonModule, FormsModule, CategorySearchComponent],
})
export class CategoryListComponent implements OnInit {
  categories: Icategory[] = [];
  filteredCategories: Icategory[] = [];
  searchTerm: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  deleteCategory(id: string): void {
    const deletedCategory = this.categories.filter((category) => category._id === id);
    console.log(deletedCategory)
    if (
      confirm(
        `Are you sure you want to delete ${deletedCategory[0].name} category?`
      )
    ) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories(); 
      });
    }
  }

  searchCategories(input_search: string): void {
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(input_search.toLowerCase())
    );
  }

  navigateToAddCategory(): void {
    this.router.navigate(['/add-category']);
  }

  navigateToUpdateCategory(id: string): void {
    this.router.navigate([`/edit-category/${id}`]);
  }

  viewProducts(categoryId: string) {
    this.router.navigate([`/products/cat/${categoryId}`]);
  }
}
