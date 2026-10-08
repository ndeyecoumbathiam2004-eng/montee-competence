import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {

  username = '';
  password = '';
  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  seConnecter(): void {

    this.erreur = '';

    if (!this.username || !this.password) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    this.chargement = true;

    this.authService.login(
      this.username,
      this.password
    ).subscribe({

      next: (response) => {

        this.chargement = false;

        if (response.role === 'COACH') {
          this.router.navigate(['/coach']);
          return;
        }

        if (response.role === 'ADMIN') {
          this.router.navigate(['/administrateur']);
          return;
        }

        if (response.role === 'ADHERENT') {
          this.router.navigate(['/espace-adherent']);
          return;
        }

        this.erreur = 'Rôle utilisateur inconnu.';
      },

      error: (error) => {

        this.chargement = false;

        if (error.status === 401 || error.status === 403) {
          this.erreur =
            'Nom d’utilisateur ou mot de passe incorrect.';
        } else {
          this.erreur =
            'Impossible de contacter le serveur.';
        }
      }
    });
  }
}