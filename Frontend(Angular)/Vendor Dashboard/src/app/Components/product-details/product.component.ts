import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Iproduct } from '../../Models/iproduct';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product!: Iproduct;
  productID: string = '';
  prdIDs: string[] = [];

  constructor(
    private productsWithApi: ProductsWithApiService,
    private activatedroute: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    // get current prdID
    this.activatedroute.paramMap.subscribe((param) => {
      this.productID = param.get('prdID') || '';
    });
    //get ids of products
    this.productsWithApi.getAllProducts().subscribe({
      next: (data) => {
        this.prdIDs = data.map((prd) => prd._id);
      },
    });
    //get product by id
    this.productsWithApi.getProductById(this.productID).subscribe({
      next: (data) => {
        this.product = data;
      },
    });
  }
  goback() {
    this.location.back();
  }
}
