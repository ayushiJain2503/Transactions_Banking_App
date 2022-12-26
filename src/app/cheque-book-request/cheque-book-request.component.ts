import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-cheque-book-request',
  templateUrl: './cheque-book-request.component.html',
  styleUrls: ['./cheque-book-request.component.css']
})
export class ChequeBookRequestComponent {

  public requestingAccNo: number = +localStorage.getItem("savingAccNo");
  public selectedValue: number;
  public loading: boolean = false;
  public pages = [
    { name: "20", value: 20 },
    { name: "50", value: 50 },
    { name: "75", value: 75 }
  ]

  constructor(
    private requestService: RequestService,
  ) { }

  public setOption(): void {
    this.loading = true;
    if (this.selectedValue == null) {
      this.selectedValue = 20;
    }
    try {
      this.requestService.insertRequest(this.requestingAccNo, +this.selectedValue).subscribe((res: any) => {       
        this.loading = false;
        if (res.status) {
          Swal.fire(
            {
              icon: 'success',
              title: 'Chequebook request placed!',
              text: res.responseMessage
            }
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.responseMessage,
          })
        }
      });
    }
    catch {
      this.loading = false;
    }
  }

  public filterSelected(value) {
    this.selectedValue = value;
  }
}