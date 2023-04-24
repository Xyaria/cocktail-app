import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take, takeUntil, ReplaySubject, interval, tap } from 'rxjs';

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
  timer: number = 10; // in seconds
  disconnected$: ReplaySubject<number> = new ReplaySubject(1);

  constructor(private auth: AuthService,
              private router: Router,
              private builder: FormBuilder){}

  ngOnInit(){
    this.initLoginForm();

    document.querySelector(".disconnect")?.addEventListener('click', () => {
        this.disconnected$.next(1);
        this.disconnected$.complete();
    });
  }
  
  onLogin(){
    this.auth.login(this.mainForm.value);
    this.canConnect = !!this.auth.getToken();
    this.router.navigateByUrl('/cocktail');

    if(this.canConnect) this.startTimer();
  }

  private initLoginForm(){
    this.loginCtrl = this.builder.control('', Validators.required);
    this.pwdCtrl = this.builder.control('', Validators.required);
    this.mainForm = this.builder.group({
      login: this.loginCtrl,
      pwd: this.pwdCtrl
    })
  }

  private startTimer() {
    const interval$ = interval(1000).pipe(
      tap((val) => {
        if(val >= this.timer-1){
          window.alert("Your session expired, please reconnect");
        }
      }),
      take(this.timer),
      takeUntil(this.disconnected$),
      finalize(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }
}
