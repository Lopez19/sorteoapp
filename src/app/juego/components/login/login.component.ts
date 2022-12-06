import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Variables
  title = 'Iniciar sesión';

  formularioLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  user: any = {};
  userOnline: any = {};

  // Constructor
  constructor(private authService: AuthService, private router: Router) {}

  // Ciclo de vida

  // Métodos
  login() {
    if (this.formularioLogin.valid) {
      this.user = this.formularioLogin.value;

      this.authService.loginUser(this.user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          this.userOnline = data.userFound;
          localStorage.setItem('userOnline', JSON.stringify(this.userOnline));

          Swal.fire({
            title: 'Login',
            text: 'Usuario logueado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/rooms']);
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      Swal.fire('Registro', 'Registro fallido', 'error');
    }
  }
}
