import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiviteService, Activite } from './activite.service';

@Component({
  selector: 'app-activites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activites.html',
  styleUrl: './activites.css'
})
export class Activites implements OnInit {

  activites: Activite[] = [];

  nouvelleActivite: Activite = {
    nom: '',
    description: '',
    duree: 60
  };

  activiteEnModification: Activite | null = null;

  constructor(private activiteService: ActiviteService) {}

  ngOnInit(): void {
    this.chargerActivites();
  }

  chargerActivites(): void {
    this.activiteService.getAll().subscribe({
      next: (data) => {
        this.activites = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des activités', error);
      }
    });
  }

  ajouterActivite(): void {
    if (
      !this.nouvelleActivite.nom.trim() ||
      !this.nouvelleActivite.description.trim()
    ) {
      return;
    }

    this.activiteService.create(this.nouvelleActivite).subscribe({
      next: () => {
        this.nouvelleActivite = {
          nom: '',
          description: '',
          duree: 60
        };

        this.chargerActivites();
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout', error);
      }
    });
  }

  modifierActivite(activite: Activite): void {
    this.activiteEnModification = {
      ...activite
    };
  }

  enregistrerModification(): void {
    if (!this.activiteEnModification?.id) {
      return;
    }

    this.activiteService
      .update(this.activiteEnModification.id, this.activiteEnModification)
      .subscribe({
        next: () => {
          this.activiteEnModification = null;
          this.chargerActivites();
        },
        error: (error) => {
          console.error('Erreur lors de la modification', error);
        }
      });
  }

  annulerModification(): void {
    this.activiteEnModification = null;
  }

  supprimerActivite(id: number): void {
    if (!confirm('Voulez-vous vraiment supprimer cette activité ?')) {
      return;
    }

    this.activiteService.delete(id).subscribe({
      next: () => {
        this.chargerActivites();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
      }
    });
  }
}