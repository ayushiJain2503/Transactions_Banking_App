import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public isLoginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public get fval() { return this.loginForm.controls; }

  public onFormSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const result: Login = Object.assign({}, this.loginForm.value);

    this.loginService.loginUser(result.username, result.password).subscribe((data: any) => {
      if (data.loginStatus) {
        this.authService.authenticate(true);
        this.authService.setUserName(data.username);
        
        localStorage.setItem('login', data.loginStatus);
        localStorage.setItem('username', data.username);

        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.responseMessage,
        })
        this.authService.authenticate(false);
        this.loading = false;
      }
    })

  }
}