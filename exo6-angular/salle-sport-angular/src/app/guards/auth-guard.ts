import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/connexion']);
  }

  const roleUtilisateur = authService.getRole();

  const role = route.data['role'];
  const roles = route.data['roles'];

  if (role && roleUtilisateur !== role) {
    return router.createUrlTree(['/']);
  }

  if (roles && !roles.includes(roleUtilisateur)) {
    return router.createUrlTree(['/']);
  }

  return true;
};