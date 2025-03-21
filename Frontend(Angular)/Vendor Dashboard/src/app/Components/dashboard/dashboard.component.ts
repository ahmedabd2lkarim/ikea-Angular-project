import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('productsChart')
  private productsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersChart')
  private ordersChartRef!: ElementRef<HTMLCanvasElement>;
  private productsChart!: Chart;
  private ordersChart!: Chart;
  productslist: string[] = [];

  constructor(
    private products: ProductsWithApiService,
    private cartService: CartService
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Increase timeout to ensure DOM elements are ready
    setTimeout(() => {
      if (this.productsChartRef && this.ordersChartRef) {
        this.initializeProductsChart();
        this.initializeOrdersChart();
      } else {
        console.error('Chart references not properly initialized');
      }
    }, 100); // Add a small delay
  }

  private initializeProductsChart(): void {
    if (!this.productsChartRef) {
      console.error('Products chart reference not initialized');
      return;
    }

    this.products.getAllProducts().subscribe((data) => {
      this.productslist = data.map((prd) => prd.name);

      const ctx = this.productsChartRef.nativeElement;
      const Data: ChartData<'bar'> = {
        labels: [...this.productslist],
        // datasets: [
        //   {
        //     label: 'Products stock',
        //     data: data.map((prd) => prd.price.currentPrice || 0),
        //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
        //     borderColor: 'rgba(54, 162, 235, 1)',
        //     borderWidth: 1,
        //   },
        datasets: [
          {
            label: 'Products stock',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      };

      const options: ChartOptions<'bar'> = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price ($)',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Products Overview',
          },
        },
      };

      this.productsChart = new Chart(ctx, {
        type: 'bar',
        data: Data,
        options: options,
      });
    });
  }

  private initializeOrdersChart(): void {
    if (!this.ordersChartRef) {
      console.error('Orders chart reference not initialized');
      return;
    }

    this.cartService.getVendorOrders().subscribe((orders) => {
      const orderSummary = orders.reduce((acc, order) => {
        order.orderItems.forEach((item) => {
          acc[item.prdID] = (acc[item.prdID] || 0) + item.quantity;
        });
        return acc;
      }, {} as Record<string, number>);

      const ctx = this.ordersChartRef.nativeElement;
      const Data: ChartData<'bar'> = {
        labels: Object.keys(orderSummary +""),
        datasets: [
          {
            label: 'Orders Quantity',
            data: Object.values(orderSummary),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      const options: ChartOptions<'bar'> = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity Ordered',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Orders Overview',
          },
        },
      };

      this.ordersChart = new Chart(ctx, {
        type: 'bar',
        data: Data,
        options: options,
      });
    });
  }
}
