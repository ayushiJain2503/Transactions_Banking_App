import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { SavingAccount, Transaction } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  public getTransactions(accNo): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.baseUrl  + '/account/getHistory/' + accNo
    );
  }
  public getSavingAccount(username): Observable<SavingAccount> {
    return this.http.get<SavingAccount>(
      environment.baseUrl + '/account/getsaving/' + username
    );
  }
}