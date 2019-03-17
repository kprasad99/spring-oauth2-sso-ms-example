import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'k-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

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
    const pwrd = this.loginForm.controls.password.value;

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/perform_login');

    const username = document.createElement('input');
    username.value = uname;
    username.name = 'username';

    form.appendChild(username);

    const password = document.createElement('input');
    password.value = pwrd;
    password.name = 'password';

    form.appendChild(password);

    document.body.appendChild(form);
    form.submit();

  }
}
