import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private user = {
    login: 'test',
    pwd: 'test'
  }

  login(values: any) {
    if(values.login === this.user['login'] && values.pwd === this.user['pwd']) {
      this.token = 'canConnect';
      return;
    }
    return;
  }

  getToken() {
    return this.token;
  }
}
