import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SideBarComponent } from "./Components/side-bar/side-bar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "./Components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, SideBarComponent, MatSidenavModule, MatIconModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProductStore';
}
