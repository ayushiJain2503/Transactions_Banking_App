import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransferHistory } from '../models';


@Injectable({
  providedIn: 'root',
})
export class TransferhistoryService {
  private url: String;

  constructor(private http: HttpClient) { }
  public getTransferHistory(accNo): Observable<TransferHistory[]> {
    return this.http.get<TransferHistory[]>(
      environment.baseUrl+ '/account/getTransfers/' + accNo
    );
  }
}