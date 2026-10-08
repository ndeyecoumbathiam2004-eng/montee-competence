import { Component } from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs';

import { AuthService } from './services/auth';

@Component({

  selector: 'app-root',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'

})

export class App {

  estConnecte = false;

  username = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    this.verifierConnexion();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        this.verifierConnexion();

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });

      });

  }

  verifierConnexion(): void {

    this.estConnecte = this.authService.isLoggedIn();

    this.username = this.authService.getUsername() || '';

  }

  seDeconnecter(): void {

    this.authService.logout();

    this.estConnecte = false;

    this.username = '';

    this.router.navigate(['/']);

  }

}