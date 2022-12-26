import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDisplay } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUser(username): Observable<UserDisplay> {
    return this.http.get<UserDisplay>(environment.baseUrl + '/home/' + username);
  }

}