import { Routes } from '@angular/router';
import { IniciComponent } from './inici/inici.component';
import { MonedesComponent } from './monedes/monedes.component';
import { NewsComponent } from './news/news.component';
import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';

export const routes: Routes = [
  {
    path:'',
    component: IniciComponent,
    title: 'Inici'
  },
  {
    path:'monedes',
    component: MonedesComponent,
    title: '/monedes'
  },
  {
    path:'ultimesnoticies',
    component: NewsComponent,
    title: '/ultimesnoticies'
  },
  {
    path:'compte',
    component: AccountComponent,
    title: '/compte'
  },
  {
    path:'cartera',
    component: WalletComponent,
    title: '/cartera'
  }
];
