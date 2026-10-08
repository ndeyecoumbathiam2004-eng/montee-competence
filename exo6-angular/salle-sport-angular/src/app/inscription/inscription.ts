import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({

  selector: 'app-inscription',

  standalone: true,

  imports: [FormsModule, RouterLink],

  templateUrl: './inscription.html',

  styleUrl: './inscription.css'

})

export class Inscription {

  nom = '';

  prenom = '';

  email = '';

  telephone = '';

  dateNaissance = '';

  motDePasse = '';

  erreur = '';

  chargement = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  sInscrire(): void {

    this.erreur = '';

    this.chargement = true;

    const data = {

      nom: this.nom,

      prenom: this.prenom,

      email: this.email,

      telephone: this.telephone,

      dateNaissance: this.dateNaissance,

      username: this.email,

      password: this.motDePasse

    };

    this.authService.register(data).subscribe({

      next: (response) => {

        console.log('Inscription réussie', response);

        this.chargement = false;

        this.router.navigate(['/connexion']);

      },

      error: (error) => {

        console.error('Erreur inscription', error);

        this.chargement = false;

        this.erreur =
          error?.error?.message ||
          'Impossible de créer le compte. Vérifiez les informations saisies.';

      }

    });

  }

}
