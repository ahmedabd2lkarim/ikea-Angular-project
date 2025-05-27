import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { ICart } from '../../Models/icart';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MatTableModule,CommonModule,MatSortModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit ,AfterViewInit{
  private _liveAnnouncer = inject(LiveAnnouncer);
  clickedRows = new Set();
  Cart: MatTableDataSource<ICart>;
  displayedColumns: string[] = ['order', 'customer', 'status', 'date','total','actions'];
  custNames:{[userID: string]:string}={};
  @ViewChild(MatSort) sort: MatSort=new MatSort;
  constructor(private cartService:CartService,private router:Router){
  this.Cart = new MatTableDataSource<ICart>([]);
  }
  ngAfterViewInit(): void {
    this.Cart.sort=this.sort;
  }
  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders()
  {
    this.cartService.getVendorOrders().subscribe(data=>{
      
      this.Cart.data=data;
    })
  }

  viewDetails(order:ICart)
  {
    this.router.navigate(['/orderDet', order._id]);
  }


  announceSortChange(sortState: Sort) {
    console.log(sortState);
    
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
 
}
