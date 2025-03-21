import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { AdminProfileComponent } from './app/pages/admin-profile/admin-profile.component';
import { CategoryListComponent } from './app/components/CategoriesAndProducts/category-list/category-list.component';
import { CategoryFormComponent } from './app/components/CategoriesAndProducts/category-form/category-form.component';
import { CatProductListComponent } from './app/components/CategoriesAndProducts/cat-product-list/cat-product-list.component';
import { PageOneComponent } from './app/components/UserVendor/page-one/page-one.component';
import { HomeComponent } from './app/pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'Settings', component: AdminProfileComponent },
  //Catagories + Product

  { path: 'categories', component: CategoryListComponent },
  { path: 'add-category', component: CategoryFormComponent },
  { path: 'edit-category/:id', component: CategoryFormComponent },
  { path: 'products/cat/:id', component: CatProductListComponent },
  //UserVendor
  { path: 'Control', component: PageOneComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));