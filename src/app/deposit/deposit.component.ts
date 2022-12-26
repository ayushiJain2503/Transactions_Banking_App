import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepositService } from '../services/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private depositService: DepositService
  ) { }

  public depositForm: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;

  public ngOnInit(): void {
    const accNo = +localStorage.getItem('savingAccNo');    
    this.depositForm = this.formBuilder.group({
      account: accNo,
      amount: ['', [Validators.required]],
    });
  }

  get savingAccount(): any {
    return localStorage.getItem('savingAccNo');
  }
  get fval() {
    return this.depositForm.controls;
  }

  public deposit(): void {
    this.submitted = true;
    if (this.depositForm.invalid) {
      return;
    }
    this.loading = true;
    const result: any = Object.assign({}, this.depositForm.value);

    // Do useful stuff with the gathered data
    try {
      this.depositService
        .insertEntry(result.account, +result.amount)
        .subscribe((data: any) => {
          this.loading = false;
          if (data.depositStatus) {
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