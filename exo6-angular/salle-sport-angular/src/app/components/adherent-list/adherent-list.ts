import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Adherent, AdherentService } from '../../services/adherent';

@Component({
  selector: 'app-adherent-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adherent-list.html',
  styleUrl: './adherent-list.css'
})
export class AdherentList implements OnInit {

  adherents: Adherent[] = [];
  loading = true;
  error = '';

  page = 0;
  size = 5;
  totalPages = 0;

  constructor(
    private adherentService: AdherentService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('INSTANCE ADHERENT LIST CRÉÉE');
  }

  ngOnInit(): void {
    console.log('ngOnInit');

    setTimeout(() => {
      console.log('1 seconde après → loading =', this.loading);
      console.log('1 seconde après → adherents =', this.adherents);
    }, 1000);

    this.chargerAdherents();
  }

  chargerAdherents(): void {
    console.log('CHARGER → loading devient true');

    this.loading = true;

    this.adherentService.getAdherents(this.page, this.size).subscribe({
      next: (response) => {
        this.adherents = response.content;
        this.totalPages = response.totalPages;

        this.loading = false;
        this.cdr.detectChanges();

        console.log('LOADING APRES REPONSE =', this.loading);
      },
      error: () => {
        this.error = 'Impossible de charger les adhérents.';
        this.loading = false;
        this.cdr.detectChanges();

        console.log('LOADING APRES ERREUR =', this.loading);
      }
    });
  }

  pageSuivante(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.chargerAdherents();
    }
  }

  pagePrecedente(): void {
    if (this.page > 0) {
      this.page--;
      this.chargerAdherents();
    }
  }
}