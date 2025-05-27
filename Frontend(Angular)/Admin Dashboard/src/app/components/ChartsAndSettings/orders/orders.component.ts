import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../services/charts-and-order.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatTableModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any[] = [];
  displayedColumns: string[] = ['id', 'user', 'status', 'total'];
  statusOptions = [
   { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          console.warn("No orders found.");
        }
        console.log(data)
        this.orders = data;
        console.log('Orders loaded:', this.orders);
        
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  updateStatus(orderId: string, newStatus: string) {
    this.orderService.updateOrderStatus(orderId, { status: newStatus }).subscribe(() => {
      this.loadOrders();
    });
  }



  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'pending';
      case 'processing': return 'processing';
      case 'shipped': return 'shipped';
      case 'delivered': return 'delivered';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  }
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" }).format(amount);
  }
}
