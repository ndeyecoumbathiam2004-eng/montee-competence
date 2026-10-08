import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Abonnement {
  id?: number;
  type: string;
  dateDebut: string;
  dateFin: string;
  adherentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private apiUrl = 'http://localhost:8080/api/abonnements';

  constructor(private http: HttpClient) {}

  getAbonnements(): Observable<Abonnement[]> {
    return this.http.get<any>(`${this.apiUrl}?page=0&size=10`).pipe(
      map(response => response.content)
    );
  }

  createAbonnement(abonnement: Abonnement): Observable<Abonnement> {
    return this.http.post<Abonnement>(this.apiUrl, abonnement);
  }

  updateAbonnement(id: number, abonnement: Abonnement): Observable<Abonnement> {
    return this.http.put<Abonnement>(`${this.apiUrl}/${id}`, abonnement);
  }

  deleteAbonnement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}