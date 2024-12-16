import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';

@Component({
  selector: 'app-buybitcoin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buybitcoin.component.html',
  styleUrl: './buybitcoin.component.css'
})
export class BuybitcoinComponent {
  amountToBuy: number = 0;
  bitcoinPrice: number = 0;
  bitcoinAmount: number = 0;
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
        this.fetchBitcoinBalance();
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


  fetchBitcoinBalance() {
    // Check if userId is valid
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    // Call walletService to fetch the balance using userId
    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        // Assuming response contains the balance
        this.bitcoinPrice = response;  // Update the balance
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  buyBitcoin() {
    if (this.amountToBuy <= 0 || this.amountToBuy > this.balance) {
      this.errorMessage = "No tens prou saldo per comprar aquesta quantitat.";
      this.transactionSuccess = false;
      return;
    }


    this.bitcoinAmount = this.amountToBuy / this.bitcoinPrice;



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
      this.walletService.updateBitcoinAmount(this.userId, this.bitcoinAmount).subscribe({
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
