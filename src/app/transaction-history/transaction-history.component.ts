import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../models/transaction';

import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { TransactionService } from '../services/transaction.service';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  public username: string = localStorage.getItem("username");
  public accNo: string = JSON.parse(localStorage.getItem("savingAccNo"));
  public savingBalance: number;


  public transactionList: Array<Transaction>;
  public columnDefs: ColDef[] = [
    { field: "date" }, { field: "id" }, { field: "action" }, { field: "amount" }
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private transactionService: TransactionService) { }

  public ngOnInit(): void {

    this.transactionService.getTransactions(this.accNo).subscribe((res: Transaction[]) => {
      this.transactionList = res;
    });

    this.transactionService.getSavingAccount(this.username).subscribe(res => {
      this.savingBalance = res.balance;
    });

  }
}
