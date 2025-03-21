import { CurrencyPipe } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsWithApiService } from '../../../Services/products-with-api.service';
import { Iproduct } from '../../../Models/iproduct';
import { Icategory } from '../../../Models/icategory';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productswithapi: ProductsWithApiService,
  ) {}
  filterlist: Iproduct[] = [];
  filterValue: string = '';
  categorylist: Icategory[] = [];
  searchValue: string = '';
  categoryID: string = '';
  ngOnInit(): void {
      this.productswithapi.getAllProducts().subscribe(data => {
        this.filterlist=data.filter(((prd:Iproduct)=>prd.name))
      })
    this.productswithapi.getAllCategories().subscribe({
      next: (data) => {
        this.categorylist = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
  searchByName(searchValue:string) {

    this.productswithapi.getAllProducts().subscribe({
      next: (data) => {
        if (searchValue) {
          this.filterlist = data.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        }else this.filterlist = data;
        console.log(data);
        console.log(this.filterlist);
        
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  searchByCategory(categoryName:string) {
    console.log(categoryName);
 let category= this.categorylist.find(item=>item.name==categoryName)

    this.productswithapi.getAllProducts().subscribe({
      next: (data) => {
        if (category?._id) {
          this.filterlist = data.filter((item) =>
            item.categoryId == category._id
          );
        }else this.filterlist = data;
        console.log(data);
        console.log(this.filterlist);
        
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
 
}
