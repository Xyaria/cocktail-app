import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard {

    constructor(private auth: AuthService,
                private router: Router) {}
      
    canActivate(): boolean {
        const token = this.auth.getToken();
        if(!!token) {
            this.router.navigateByUrl('/cocktail');
        }
        return !token;
    }
}