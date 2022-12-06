import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variables
  private _registerUrl = 'http://localhost:3000/api';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {}

  // Ciclo de vida

  // Métodos
  registerUser(user: any) {
    return this.http.post<any>(`${this._registerUrl}/auth/signup`, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(`${this._registerUrl}/auth/signin`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

      Swal.fire({
        title: 'Sesión cerrada',
        text: 'Hasta pronto',
        icon: 'success',
      });
    }
  }
}
