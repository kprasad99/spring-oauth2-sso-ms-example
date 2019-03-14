import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'k-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faSpinner = null;
  isInProgress = false;
  returnUrl: string;
  error = '';

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // reset login status
    this.auth.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
  }

  onSubmit() {
    if (this.loginForm.controls.username.invalid && this.loginForm.controls.username.invalid) {
      return;
    }
    this.loginForm.setErrors({ loginFailed: false });
    this.isInProgress = true;
    const uname = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.auth.login(uname, password).subscribe((r: any) => {
      localStorage.setItem('currentUser', JSON.stringify({
        token: r.body.access_token
      }));
    }, e => {
      this.isInProgress = false;
      this.loginForm.setErrors({ loginFailed: true });
    }, () => {
      this.isInProgress = false;
      this.router.navigate([this.returnUrl]);
    });
  }
}
