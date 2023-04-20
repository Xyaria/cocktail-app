import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mainForm!: FormGroup;
  loginCtrl!: FormControl;
  pwdCtrl!: FormControl;
  canConnect: boolean = true;

  constructor(private auth: AuthService,
              private router: Router,
              private builder: FormBuilder){}

  ngOnInit(){
    this.initLoginForm();
  }
  
  onLogin(){
    this.auth.login(this.mainForm.value);
    this.canConnect = !!this.auth.getToken();
    this.router.navigateByUrl('/cocktail');
  }

  private initLoginForm(){
    this.loginCtrl = this.builder.control('', Validators.required);
    this.pwdCtrl = this.builder.control('', Validators.required);
    this.mainForm = this.builder.group({
      login: this.loginCtrl,
      pwd: this.pwdCtrl
    })
  }
}
