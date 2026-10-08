import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error) => {

      console.error('ERREUR HTTP =', error);

      if (error.status === 0) {
        alert('Impossible de contacter le serveur.');
      }
      else if (error.status === 400) {
        alert('Requête incorrecte.');
      }
      else if (error.status === 404) {
        alert('Ressource introuvable.');
      }
      else if (error.status === 500) {
        alert('Erreur interne du serveur.');
      }
      else {
        alert('Une erreur est survenue.');
      }

      return throwError(() => error);
    })
  );
};