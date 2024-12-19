import { Component, inject, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currentuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currentuser.component.html',
  styleUrl: './currentuser.component.css'
})
export class CurrentuserComponent {
  @Output() userChange = new EventEmitter<string | null>();

  userName: string = '';
  userId: string | null = null;
  private intervalId: any;

  private walletService = inject(WalletService);

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userChange.emit(this.userId);

    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchUserName();
      }, 1000);
    }
  }

  fetchUserName() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getUserName(this.userId).subscribe(
      (response: string) => {
        this.userName = response;
        this.userChange.emit(this.userId); // Emitir el usuario actual después de obtener el nombre
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }
}
