import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ChequeBookRequestComponent } from './cheque-book-request/cheque-book-request.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferBetweenAccountsComponent } from './transfer-between-accounts/transfer-between-accounts.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HeaderComponent } from './header/header.component';
import { AgGridModule } from 'ag-grid-angular';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChequeBookRequestComponent,
    TransactionHistoryComponent,
    TransferBetweenAccountsComponent,
    TransferHistoryComponent,
    DepositComponent,
    WithdrawComponent,
    HeaderComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule 
  ],
  providers: [RegisterService, LoginService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }