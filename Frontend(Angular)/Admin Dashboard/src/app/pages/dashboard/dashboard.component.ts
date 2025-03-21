import { Component } from '@angular/core';
import { ChartsComponent } from "../../components/ChartsAndSettings/charts/charts.component";
import { CardsComponent } from "../../components/ChartsAndSettings/cards/cards.component";
import { OrdersComponent } from "../../components/ChartsAndSettings/orders/orders.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  imports: [ChartsComponent, CardsComponent, OrdersComponent,MatSidenavModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  opened: boolean = true;

  toggleSidebar() {
    this.opened = !this.opened;
  }

}
