import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { OrderService } from './services/charts-and-order.service';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';



import { HeaderComponent } from "./components/ChartsAndSettings/header/header.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,MatListModule, MatSidenavModule, MatIconModule, CommonModule, RouterOutlet , HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  opened: boolean = true;



  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }


}
