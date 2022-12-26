import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class WithdrawService {

  constructor(private http: HttpClient) {}

  public insertEntry(account: string, amount: number) {
    const body = {
      account: account,
      amount: amount,
    };
    return this.http.post(environment.baseUrl + '/account/withdraw', body);
  }
}