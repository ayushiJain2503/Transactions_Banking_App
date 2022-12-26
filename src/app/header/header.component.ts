import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: Observable<boolean>;
  public isRegsiter: Observable<boolean>;
  public user: Observable<string>;
  public isShow: boolean = false;
  public isMobileNav:boolean = false;
  constructor(public authService: AuthService) { }

  public ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = this.authService.userName;
    this.isRegsiter = this.authService.isRegisterPage;
  }

  public toggleMenu() {
    this.isShow = !this.isShow;
  }

  public toggleNav(){
    this.isMobileNav = !this.isMobileNav;
  }

  public logOut() {
    localStorage.setItem('login', 'false');
    this.isShow = !this.isShow;
    this.authService.authenticate(false);
  }
}
