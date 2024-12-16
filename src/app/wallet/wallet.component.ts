import { Component, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  balance = 0;
  userId: string | null = null;
  bitcoinAmount: number = 0;
  ethereumAmount: number = 0;
  litecoinAmount: number = 0;
  bitcoinValue: number = 0;
  ethereumValue: number = 0;
  litecoinValue: number = 0;
  userBitcoinValue: number = 0;
  userEthereumValue: number = 0;
  userLitecoinValue: number = 0;
  totalNetWorth: number = 0;
  private intervalId: any;

  private walletService = inject(WalletService);
  private cryptoWalletService = inject(CryptoWalletService);

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchBalance();
        this.fetchBitcoinAmount();
        this.fetchBitcoinValue();
        this.fetchEthereumAmount();
        this.fetchEthereumValue();
        this.fetchLitecoinAmount();
        this.fetchLitecoinValue();
        this.calculateNetWorth();
      }, 1000);
    }
  }

  fetchBalance() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getBalance(this.userId).subscribe(
      (response: number) => {
        this.balance = parseFloat(response.toFixed(2));
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  fetchBitcoinValue() {
    this.cryptoWalletService.getBitcoinPrice().subscribe(
      (response: number) => {
        this.bitcoinValue = response;
      },
      (error) => {
        console.error('Error fetching bitcoin value:', error);
      }
    );
  }

  fetchEthereumValue() {
    this.cryptoWalletService.getEthereumPrice().subscribe(
      (response: number) => {
        this.ethereumValue = response;
      },
      (error) => {
        console.error('Error fetching Ethereum value:', error);
      }
    );
  }

  fetchLitecoinValue() {
    this.cryptoWalletService.getLitecoinPrice().subscribe(
      (response: number) => {
        this.litecoinValue = response;
      },
      (error) => {
        console.error('Error fetching Litecoin value:', error);
      }
    );
  }

  fetchBitcoinAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getBitcoinAmount(this.userId).subscribe(
      (response: number) => {
        this.bitcoinAmount = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
    this.userBitcoinValue = parseFloat((this.bitcoinAmount * this.bitcoinValue).toFixed(2));
  }

  fetchEthereumAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getEthereumAmount(this.userId).subscribe(
      (response: number) => {
        this.ethereumAmount = response;
      },
      (error) => {
        console.error('Error fetching Ethereum amount:', error);
      }
    );
    this.userEthereumValue = parseFloat((this.ethereumAmount * this.ethereumValue).toFixed(2));
  }

  fetchLitecoinAmount() {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    this.walletService.getLitecoinAmount(this.userId).subscribe(
      (response: number) => {
        this.litecoinAmount = response;
      },
      (error) => {
        console.error('Error fetching Litecoin amount:', error);
      }
    );
    this.userLitecoinValue = parseFloat((this.litecoinAmount * this.litecoinValue).toFixed(2));
  }

  calculateNetWorth() {
    this.totalNetWorth = parseFloat((this.balance + this.userBitcoinValue + this.userEthereumValue + this.userLitecoinValue).toFixed(2));
  }


  onSubmit(event: any) {
    const transactionType = event.target.querySelector('#transactionType').value;
    const amount = parseFloat(event.target.querySelector('#amount').value);

    if (transactionType === 'deposit') {
      this.balance += amount;
      if (this.userId) {
        this.walletService.updateBalance(this.userId, this.balance).subscribe(
          (response) => {
            alert(`Deposited: $${amount}`);
          },
          (error) => {
            console.error('Error updating balance:', error);
            alert('An error occurred while updating the balance.');
          }
        );
      }


    } else if (transactionType === 'withdraw') {
      if (amount <= this.balance) {
        this.balance -= amount;
        // Update balance on the server
        if (this.userId) {
          this.walletService.updateBalance(this.userId, this.balance).subscribe(
            (response) => {
              alert(`Withdrawn: $${amount}`);
            },
            (error) => {
              console.error('Error updating balance:', error);
              alert('An error occurred while updating the balance.');
            }
          );
        }
      } else {
        alert('You do not have sufficient balance.');
      }
    }
    return false;
  }



}
