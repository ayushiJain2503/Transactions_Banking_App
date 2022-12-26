import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TransactionService } from '../services/transaction.service';
import { TransferhistoryService } from '../services/transfer-history.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public username: string = 'test user';
  private accNo: number = +localStorage.getItem("savingAccNo");
  public savingAcc: number = 12300000;
  public primaryAcc: number;
  public savingBalanceLocal: number = 2000;
  public primaryBalanceLocal: number;
  public transaction: any = {
    count: 0,
    deposit: 0,
    withdrawl: 0,
    total: 0
  };
  public transfer = 0;

  constructor(public authService: AuthService,
    public userService: UserService,
    private transactionService: TransactionService,
    private transferService: TransferhistoryService) {
  }

  /**
   * This function is used to get User information on load and then set all variables accordingly.
   */
  public ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.userService.getUser(this.username).subscribe(res => {
      this.savingAcc = res.savingsAccno;
      this.primaryAcc = res.primaryAccno;
      this.savingBalanceLocal = res.savingsBalance;
      this.primaryBalanceLocal = res.primaryBalance;
      localStorage.setItem("savingAccNo", this.savingAcc.toString());
    });

    this.transactionService.getTransactions(this.accNo).subscribe((res) => {
      if (res) {
        this.transaction.count = res.length;
        res.forEach(item => {
          if (item.action == 'deposit') {
            this.transaction.deposit += item.amount;
          } else {
            this.transaction.withdrawl += item.amount;
          }
        });
        this.transaction.total = this.transaction.withdrawl + this.transaction.deposit;
      }
    });

    this.transferService.getTransferHistory(this.accNo).subscribe(res => {
      if (res) {
        res.forEach(item => {
          this.transfer += item.amount;
        })
      }
    });
  }

  public displayuserdetails(): void {
    this.userService.getUser(this.username).subscribe(() => this.ngOnInit());
  }

}