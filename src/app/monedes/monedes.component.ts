import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { CryptoWalletService } from '../services/cyrptowallet.service';
import { BuybitcoinComponent } from "../buybitcoin/buybitcoin.component";
import { SellbitcoinComponent } from '../sellbitcoin/sellbitcoin.component';
import { BuyethereumComponent } from "../buyethereum/buyethereum.component";
import { SellethereumComponent } from "../sellethereum/sellethereum.component";
import { BuylitecoinComponent } from "../buylitecoin/buylitecoin.component";
import { SelllitecoinComponent } from "../selllitecoin/selllitecoin.component";

@Component({
  selector: 'app-monedes',
  standalone: true,
  imports: [FormsModule, BuybitcoinComponent, SellbitcoinComponent, BuyethereumComponent, SellethereumComponent, BuylitecoinComponent, SelllitecoinComponent],
  templateUrl: './monedes.component.html',
  styleUrl: './monedes.component.css'
})
export class MonedesComponent {

}
