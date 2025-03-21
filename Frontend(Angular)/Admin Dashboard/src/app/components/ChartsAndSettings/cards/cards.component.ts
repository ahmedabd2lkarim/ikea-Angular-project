import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/charts-and-order.service';

@Component({
  selector: 'app-cards',
  imports: [CdkDrag,CdkDropList,MatIconModule,CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  blocks = [
    { icon: 'shopping_cart', text: `Total Orders<br>0`, gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' }, 
    { icon: 'attach_money', text: `Total Revenue<br>$0`, gradient: 'linear-gradient(135deg, #ffcc00, #ffb300)' }, 
    { icon: 'group', text: `Total Users<br>0`, gradient: 'linear-gradient(135deg, #0f3460, #16213e)' }, 
    { icon: 'store', text: `Total Vendors<br>0`, gradient: 'linear-gradient(135deg, #142850, #27496d)' } 
];
  totalRevenue: string = 'Loading...';
  totalOrders: number = 0;
  totalUsers: string = 'Loading...';
  totalVendors: string = 'Loading...';
    constructor(private orderService: OrderService) { }
  
  ngOnInit() {
    this.loadTotalRevenue();
    this.fetchTotalOrders();
    this.loadUserData();

  }
  fetchTotalOrders() {
    this.orderService.getAllOrders().subscribe(
      (orders) => {
        this.totalOrders = orders.length;
        this.blocks[0].text = `Total Orders<br>${this.totalOrders}`;
      },
      (error) => console.error('Error fetching orders:', error)
    );
  }

  loadTotalRevenue() {
    this.orderService.getTotalRevenue().subscribe(
      (response) => {
        this.totalRevenue = `$${response.totalRevenue}`;
        this.blocks[1].text = `Total Revenue This Month<br>${this.totalRevenue}`;
      },
      (error) => {
        console.error('Error fetching revenue:', error);
        this.blocks[1].text = 'Revenue: Error';
      }
    );
  }

  loadUserData() {
    this.orderService.getUserCount().subscribe(
      (response) => {
        this.totalUsers = response.customerCount + response.vendorCount;
        this.totalVendors = response.vendorCount;
        this.blocks[2].text = `Total Users<br>${this.totalUsers}`;
        this.blocks[3].text = `Total Vendors<br>${this.totalVendors}`;
      },
      (error) => {
        console.error('Error fetching user count:', error);
        this.blocks[2].text = 'User Count: Error';
        this.blocks[3].text = 'Vendor Count: Error';
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

}
