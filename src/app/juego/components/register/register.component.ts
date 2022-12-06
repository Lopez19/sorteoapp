import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Variables
  title = 'Registro';

  formularioRegistro = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    DNI: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  user: any = {};

  // Constructor
  constructor(private authService: AuthService, private router: Router) {}

  // Ciclo de vida

  // Métodos
  register() {
    if (this.formularioRegistro.valid) {
      this.user = this.formularioRegistro.value;

      this.authService.registerUser(this.user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          Swal.fire({
            title: 'Registro',
            text: 'Usuario registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
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
