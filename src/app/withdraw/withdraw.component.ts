import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { WithdrawService } from '../services/withdraw.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private withdrawService: WithdrawService
  ) {}
  public withdrawForm: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;

  public ngOnInit(): void {
    var accNo = +localStorage.getItem('savingAccNo');    
    this.withdrawForm = this.formBuilder.group({
      account: accNo,
      amount: ['', [Validators.required]],
    });
  }

  get savingAccount(): any {
    return localStorage.getItem('savingAccNo');
  }
  get fval() {
    return this.withdrawForm.controls;
  }

  public withdraw(): void {
    this.submitted = true;
    if (this.withdrawForm.invalid) {
      return;
    }
    this.loading = true;
    const result: any = Object.assign({}, this.withdrawForm.value);

    // Do useful stuff with the gathered data
    try {
      this.withdrawService
        .insertEntry(result.account, +result.amount)
        .subscribe((data: any) => {
          this.loading = false;
          if (data.withdrawStatus == true) {
            Swal.fire({
              icon: 'success',
              title: 'Transaction successful',
              text: data.responseMessage,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.responseMessage,
            });
          }
        });
    } catch {
      this.loading = false;
    }
  }
}