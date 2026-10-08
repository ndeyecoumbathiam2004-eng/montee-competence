import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';


interface LoginRequest {

  username: string;

  password: string;

}


export interface RegisterRequest {

  nom: string;

  prenom: string;

  email: string;

  telephone: string;

  dateNaissance: string;

  username: string;

  password: string;

}


export interface AuthResponse {

  token: string;

  username: string;

  role: string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';


  constructor(
    private http: HttpClient
  ) {
  }


  login(
    username: string,
    password: string
  ): Observable<AuthResponse> {

    const data: LoginRequest = {

      username: username,

      password: password

    };


    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        data
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'username',
            response.username
          );

          localStorage.setItem(
            'role',
            response.role
          );

        })

      );

  }


  register(
    data: RegisterRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      data
    );

  }


  getToken(): string | null {

    return localStorage.getItem('token');

  }


  getUsername(): string | null {

    return localStorage.getItem('username');

  }


  getRole(): string | null {

    return localStorage.getItem('role');

  }


  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }


  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('username');

    localStorage.removeItem('role');

  }

}
