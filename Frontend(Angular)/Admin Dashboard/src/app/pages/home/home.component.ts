import { Component } from '@angular/core';
import { PageOneService } from '../../services/page-one.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  token: any;
  constructor(private pageOneService: PageOneService, private router: Router) {}
  
    login() {
      this.pageOneService.login('admin11@example.com', 'admin1').subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.token = response.token;
          localStorage.setItem('token', this.token!);
          this.router.navigate(['/dashboard']);

        },
        (error) => console.error('Login error:', error)
      );
    }
  

}
