import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = {
    login: 'test',
    pwd: 'test'
  }

  constructor(private router: Router){}

  async loginTimeout() {

  }

  login(values: any) {
    if(values.login === this.user['login'] && values.pwd === this.user['pwd']) {
      localStorage.setItem('token', 'ok');
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}