import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor() { }

  logout() {
    localStorage.removeItem('userId');

    alert('Logged out successfully');
    window.location.reload();
  }
}
