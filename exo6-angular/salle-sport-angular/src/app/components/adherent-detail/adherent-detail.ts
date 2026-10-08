import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adherent-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './adherent-detail.html',
  styleUrl: './adherent-detail.css'
})
export class AdherentDetail implements OnInit {

  adherent: any = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    // Garde ici ton code actuel de chargement de l'adhérent.
  }

}