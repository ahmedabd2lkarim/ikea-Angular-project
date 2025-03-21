import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from '../../../services/charts-and-order.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatIconModule,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  pageTitle: string = '';
  adminName: string = 'Admin';
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAdminDetails().subscribe(
      (data) => {
        this.adminName = data?.user.name || 'Admin';
      },
      (error) => {
        console.error('Error fetching admin details', error);
      }
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/').pop();
        this.pageTitle = this.formatTitle(currentRoute);
      }
    });
  }

  private formatTitle(route: string | undefined): string {
    if (!route) return 'Dashboard'; 
    return route.charAt(0).toUpperCase() + route.slice(1); 
  }
  logout() {
    localStorage.removeItem('token');
    window.location.href = '';
  }


}
