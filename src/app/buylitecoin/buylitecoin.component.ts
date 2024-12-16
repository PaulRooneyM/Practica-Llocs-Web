import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';

@Component({
  selector: 'app-buylitecoin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buylitecoin.component.html',
  styleUrl: './buylitecoin.component.css'
})
export class BuylitecoinComponent {

  amountToBuy: number = 0;
  litecoinPrice: number = 0;
  litecoinAmount: number = 0;
  errorMessage: string = '';
  transactionSuccess: boolean = false;


  balance = 0;
  userId: string | null = null;
  private intervalId: any;

  private walletService = inject(WalletService);
  private cryptoWalletService = inject(CryptoWalletService);

  constructor() {}


  ngOnInit() {
    // Retrieve the user ID from localStorage
    this.userId = localStorage.getItem('userId');

    // If there's a valid userId, start fetching the balance every second
    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchBalance();
        this.fetchLitecoinBalance();
      }, 1000);  // Fetch balance every second (1000ms)
    }
  }


  fetchBalance() {
    // Check if userId is valid
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    // Call walletService to fetch the balance using userId
    this.walletService.getBalance(this.userId).subscribe(
      (response: number) => {
        // Assuming response contains the balance
        this.balance = parseFloat(response.toFixed(2));  // Update the balance with max 2 decimals
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  fetchLitecoinBalance() {
    // Check if userId is valid
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    // Call cryptoWalletService to fetch the litecoin balance using userId
    this.cryptoWalletService.getLitecoinPrice().subscribe(
      (response: number) => {
        // Assuming response contains the litecoin balance
        this.litecoinPrice = parseFloat(response.toFixed(6));  // Update the litecoin balance with max 8 decimals
      },
      (error) => {
        console.error('Error fetching litecoin balance:', error);
      }
    );
  }


  buyLitecoin() {
    if (this.amountToBuy <= 0 || this.amountToBuy > this.balance) {
      this.errorMessage = "No tens prou saldo per comprar aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }


    this.litecoinAmount = this.amountToBuy / this.litecoinPrice;

    this.balance -= this.amountToBuy;

    if (this.userId) {
      this.walletService.updateBalance(this.userId, this.balance).subscribe({
        next: (response) => {
          this.transactionSuccess = true;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating balance:', error);
          this.transactionSuccess = false;
          this.errorMessage = 'Error updating balance';
        }
      });
    }

    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.walletService.updateLitecoinAmount(this.userId, this.litecoinAmount).subscribe({
        next: (response) => {
          this.transactionSuccess = true;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating balance:', error);
          this.transactionSuccess = false;
          this.errorMessage = 'Error updating balance';
        }
      });
    } else {
      console.error('User ID is not available');
      this.transactionSuccess = false;
      this.errorMessage = 'User ID is not available';
    }

    this.errorMessage = '';
    this.transactionSuccess = true;

  }



}
