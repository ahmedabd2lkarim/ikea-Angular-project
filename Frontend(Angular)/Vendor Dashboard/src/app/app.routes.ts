import { Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { VendorProfileComponent } from './Components/vendor-profile/vendor-profile.component';
import { ProductsComponent } from './Components/products/products/products.component';
import { ProductComponent } from './Components/product-details/product.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'orderDet/:ordID',
    component: OrderDetailsComponent,
    title: 'Order Details',
  },
  { path: 'vendor-orders', component: CartComponent, title: 'Vendor Orders' },
  {
    path: 'vendor-profile',
    component: VendorProfileComponent,
    title: 'Vendor Profile',
  },
  {
    path: 'products/vendorPros',
    component: ProductsComponent,
    title: "Vendor's Products",
  },
  {
    path: 'products/vendorPros/:prdID',
    component: ProductComponent,
    title: 'View Product',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Vendor Dashboard',
  },
];
