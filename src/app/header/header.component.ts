import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loaded!: boolean;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          this.loaded = val['url'] !== '/login' ? true : false;
        }
        if(!this.loaded) {
          document.querySelector(".disconnect")?.classList.add('hidden');
        }
        else {
          document.querySelector(".disconnect")?.classList.remove('hidden');
        }
    });
  }

  onDisconnect() {
    document.querySelector('.disconnectMsg')?.classList.add("hidden");
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }
}
