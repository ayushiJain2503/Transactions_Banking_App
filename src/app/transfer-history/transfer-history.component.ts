import { Component, OnInit } from '@angular/core';
import { TransferHistory } from '../models/transferhistory'

import { ColDef } from 'ag-grid-community';
import { TransferhistoryService } from '../services/transfer-history.service';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.css']
})
export class TransferHistoryComponent implements OnInit {

  private accNo: number = +localStorage.getItem("savingAccNo");
  public transferList: Array<TransferHistory>;
  public columnDefs: ColDef[] = [
    { field: "date" }, { field: "id" }, { field: "amount" }, { field: "saccount",  headerName:"Savings A/C No" }, { field: "raccount" , headerName:"Primary A/C No"}
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };


  constructor(private transferService: TransferhistoryService) { }

  public ngOnInit(): void {
    this.transferService.getTransferHistory(this.accNo).subscribe(res => {
      this.transferList = res;
    });
  }

}