import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ChequeBookRequestComponent } from './cheque-book-request/cheque-book-request.component';
import { TransferBetweenAccountsComponent } from './transfer-between-accounts/transfer-between-accounts.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AuthGuard } from './services/auth.guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'transfer',
    component: TransferBetweenAccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactionHistory',
    component: TransactionHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chequebookRequest',
    component: ChequeBookRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transferHistory',
    component: TransferHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }