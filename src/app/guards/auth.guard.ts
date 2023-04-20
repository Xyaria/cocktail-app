import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

    constructor(private auth: AuthService,
                private router: Router) {}
      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.auth.getToken();
        if(!token) {
            this.router.navigateByUrl('/login');
        }
        return !!token;
    }
}