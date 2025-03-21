import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true, 
  imports: [CommonModule],
  template: `<h2>User Component</h2>`,
  styleUrls: ['./user.component.css'],
})
export class UserComponent {}
