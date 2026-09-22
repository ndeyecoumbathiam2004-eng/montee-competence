import { Routes } from '@angular/router';
import { AdherentList } from './components/adherent-list/adherent-list';
import { AdherentForm } from './components/adherent-form/adherent-form';
import { AdherentDetail } from './components/adherent-detail/adherent-detail';

export const routes: Routes = [
  {
    path: 'adherents',
    component: AdherentList
  },
  {
    path: 'adherents/nouveau',
    component: AdherentForm
  },
  {
    path: 'adherents/:id/modifier',
    component: AdherentForm
  },
  {
    path: 'adherents/:id',
    component: AdherentDetail
  },
  {
    path: '',
    redirectTo: 'adherents',
    pathMatch: 'full'
  }
];