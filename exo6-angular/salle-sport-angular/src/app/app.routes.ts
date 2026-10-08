import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Connexion } from './connexion/connexion';
import { Inscription } from './inscription/inscription';
import { Programme } from './programme/programme';
import { Tarifs } from './tarifs/tarifs';
import { Contact } from './contact/contact';

import { AdherentList } from './components/adherent-list/adherent-list';
import { AdherentForm } from './components/adherent-form/adherent-form';
import { AdherentDetail } from './components/adherent-detail/adherent-detail';

import { AbonnementList } from './abonnement-list/abonnement-list';
import { AbonnementForm } from './abonnement-form/abonnement-form';

import { Administrateur } from './administrateur/administrateur';
import { Coach } from './coach/coach';
import { EspaceAdherent } from './espace-adherent/espace-adherent';

import { Activites } from './activites/activites';
import { Planning } from './planning/planning';

import { authGuard } from './guards/auth-guard';


export const routes: Routes = [

  // =========================
  // PAGES PUBLIQUES
  // =========================

  {
    path: '',
    component: Home
  },

  {
    path: 'connexion',
    component: Connexion
  },

  {
    path: 'inscription',
    component: Inscription
  },

  {
    path: 'programme',
    component: Programme
  },

  {
    path: 'tarifs',
    component: Tarifs
  },

  {
    path: 'contact',
    component: Contact
  },


  // =========================
  // ESPACE ADHÉRENT
  // =========================

  {
    path: 'espace-adherent',
    component: EspaceAdherent,
    canActivate: [authGuard],
    data: {
      role: 'ADHERENT'
    }
  },


  // =========================
  // ADHÉRENTS
  // =========================

  {
    path: 'adherents',
    component: AdherentList,
    canActivate: [authGuard],
    data: {
      roles: ['ADHERENT', 'COACH', 'ADMIN']
    }
  },

  {
    path: 'adherents/nouveau',
    component: AdherentForm,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN']
    }
  },

  {
    path: 'adherents/:id/modifier',
    component: AdherentForm,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN']
    }
  },

  {
    path: 'adherents/:id',
    component: AdherentDetail,
    canActivate: [authGuard],
    data: {
      roles: ['ADHERENT', 'COACH', 'ADMIN']
    }
  },


  // =========================
  // ABONNEMENTS
  // =========================

  {
    path: 'abonnements',
    component: AbonnementList,
    canActivate: [authGuard],
    data: {
      roles: ['ADHERENT', 'COACH', 'ADMIN']
    }
  },

  {
    path: 'abonnements/nouveau',
    component: AbonnementForm,
    canActivate: [authGuard],
    data: {
      roles: ['ADMIN']
    }
  },


  // =========================
  // ACTIVITÉS
  // =========================

  {
    path: 'activites',
    component: Activites,
    canActivate: [authGuard],
    data: {
      roles: ['COACH', 'ADMIN', 'ADHERENT']
    }
  },


  // =========================
  // PLANNING
  // =========================

  {
    path: 'planning',
    component: Planning,
    canActivate: [authGuard],
    data: {
      roles: ['COACH', 'ADMIN', 'ADHERENT']
    }
  },


  // =========================
  // ADMINISTRATEUR
  // =========================

  {
    path: 'administrateur',
    component: Administrateur,
    canActivate: [authGuard],
    data: {
      role: 'ADMIN'
    }
  },


  // =========================
  // COACH
  // =========================

  {
    path: 'coach',
    component: Coach,
    canActivate: [authGuard],
    data: {
      role: 'COACH'
    }
  },


  // =========================
  // ROUTE INCONNUE
  // =========================

  {
    path: '**',
    redirectTo: ''
  }

];