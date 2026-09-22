import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherentService } from '../../services/adherent';

@Component({
  selector: 'app-adherent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adherent-form.html',
  styleUrl: './adherent-form.css'
})
export class AdherentForm implements OnInit {

  adherentForm: any;

  id: number | null = null;
  modeModification = false;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private adherentService: AdherentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.adherentForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      dateNaissance: ['']
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = Number(id);
      this.modeModification = true;

      this.chargerAdherent();
    }
  }

  chargerAdherent(): void {

    if (this.id === null) {
      return;
    }

    this.loading = true;

    this.adherentService.getAdherent(this.id).subscribe({
      next: (adherent) => {

        this.adherentForm.patchValue({
          nom: adherent.nom,
          prenom: adherent.prenom,
          email: adherent.email,
          telephone: adherent.telephone,
          dateNaissance: adherent.dateNaissance
        });

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log('ERREUR CHARGEMENT ADHERENT =', err);

        this.error = 'Impossible de charger cet adhérent.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  enregistrer(): void {

    if (this.adherentForm.invalid) {
      this.adherentForm.markAllAsTouched();
      return;
    }

    const adherent = this.adherentForm.value;

    if (this.modeModification && this.id !== null) {

      this.adherentService.updateAdherent(this.id, adherent).subscribe({
        next: (response) => {

          console.log('ADHERENT MODIFIE =', response);

          alert('Adhérent modifié avec succès !');

          this.router.navigate(['/adherents']);
        },

        error: (err) => {

          console.log('ERREUR MODIFICATION ADHERENT =', err);

          alert('Erreur lors de la modification de l’adhérent.');
        }
      });

    } else {

      this.adherentService.createAdherent(adherent).subscribe({
        next: (response) => {

          console.log('ADHERENT CREE =', response);

          alert('Adhérent créé avec succès !');

          this.adherentForm.reset();

          this.router.navigate(['/adherents']);
        },

        error: (err) => {

          console.log('ERREUR CREATION ADHERENT =', err);

          alert('Erreur lors de la création de l’adhérent.');
        }
      });
    }
  }
}