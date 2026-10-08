import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private apiUrl = 'http://localhost:8080/api/adherents';

  constructor(private http: HttpClient) {}

  getAdherents(page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getAdherent(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.apiUrl}/${id}`);
  }

  createAdherent(adherent: Adherent): Observable<Adherent> {
    return this.http.post<Adherent>(this.apiUrl, adherent);
  }

  updateAdherent(id: number, adherent: Adherent): Observable<Adherent> {
    return this.http.put<Adherent>(`${this.apiUrl}/${id}`, adherent);
  }

  deleteAdherent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}