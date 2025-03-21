import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/ChartsAndSettings/dashboard/dashboard.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { CategoryListComponent } from './components/CategoriesAndProducts/category-list/category-list.component';
import { CategoryFormComponent } from './components/CategoriesAndProducts/category-form/category-form.component';
import { CatProductListComponent } from './components/CategoriesAndProducts/cat-product-list/cat-product-list.component';
import { PageOneComponent } from './components/UserVendor/page-one/page-one.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '/', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'Settings', component: AdminProfileComponent },
    { path: '**', redirectTo: 'dashboard' },
    //Catagories + Product
    { path: 'categories', component: CategoryListComponent },
    { path: 'add-category', component: CategoryFormComponent },
    { path: 'edit-category/:id', component: CategoryFormComponent },
    { path: 'products/cat/:id', component: CatProductListComponent },
    //UserVendor
    { path: 'Control', component: PageOneComponent },




];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }