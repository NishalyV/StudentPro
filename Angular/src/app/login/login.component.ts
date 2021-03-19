import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  error: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.LoginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(`(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}`)
    ]]
    });
  }
  get f() { return this.LoginForm.controls; }


  login() {

    this.authservice.login(this.f.Email.value, this.f.Password.value).subscribe(
    data => {
      let redirect = this.authservice.redirectUrl ? this.authservice.redirectUrl : 'students';
    this.router.navigate([redirect]);
    },
    error => {
      this.error = error;
    }
    );
  }

  logout() {
    this.authservice.logout();
  }

 
 
}

