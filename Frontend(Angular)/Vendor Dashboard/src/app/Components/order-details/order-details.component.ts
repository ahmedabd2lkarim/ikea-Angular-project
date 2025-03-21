import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { ICart } from '../../Models/icart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  items:any[]=[];
  orderId: string | null = null;
  order: any;
  constructor( private activatedroute: ActivatedRoute, private cartService: CartService) { }
  ngOnInit(): void {
    this.orderId = this.activatedroute.snapshot.paramMap.get("ordID")
    
    this.cartService.getVendorOrders().subscribe(data => {
      this.order = data.find(x => x._id == this.orderId)
      this.items=this.order?.orderItems;
    })
  }
}
