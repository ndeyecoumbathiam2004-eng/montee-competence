import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Adherent, AdherentService } from '../../services/adherent';

@Component({
  selector: 'app-adherent-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adherent-detail.html',
  styleUrl: './adherent-detail.css'
})
export class AdherentDetail implements OnInit {

  adherent: Adherent | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private adherentService: AdherentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.adherentService.getAdherent(id).subscribe({
      next: (response) => {
        console.log('ADHERENT DETAIL =', response);

        this.adherent = response;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log('ERREUR DETAIL =', err);

        this.error = 'Impossible de charger cet adhérent.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}