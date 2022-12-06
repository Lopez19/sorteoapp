import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { SorteosService } from '../../services/sorteos.service';

import { Sorteo } from '../../interfaces/Sorteo.interface';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  // Variables
  rooms: Sorteo[] = [];
  winners: any[] = [
    {
      id: 1,
      name: 'Juan',
      number: 1,
    },
    {
      id: 2,
      name: 'Pedro',
      number: 2,
    },
  ];

  userOnline: User = {};
  participant: any = {};
  numerosRoom: any[] = [];

  // Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private sorteosService: SorteosService
  ) {}

  // Ciclo de vida
  ngOnInit(): void {
    this.getRooms();
    if (localStorage.getItem('userOnline')) {
      this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '{}');
    }
  }

  // Métodos
  loggeado() {
    return this.authService.loggedIn();
  }

  getRooms() {
    this.sorteosService.getSorteos().subscribe({
      next: (res: any) => {
        this.rooms = res.sorteos;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoom(id: string) {
    this.sorteosService.getSorteo(id).subscribe({
      next: (res: any) => {
        this.numerosRoom = res.sorteo.participants.map((participant: any) => {
          return participant.number;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  joinRoom(room: Sorteo) {
    this.getRoom(room._id);

    // Numero aleatorio entre 1 y 50 (no repetido)
    const Aleatorio = Math.floor(Math.random() * 50) + 1; // 1 - 50
    let numeroAleatorio = Aleatorio;

    // Validar que el numero no este repetido
    if (this.numerosRoom.includes(numeroAleatorio)) {
      numeroAleatorio = Aleatorio;
    }

    // Swal
    Swal.fire({
      title: 'Unirse a la sala',
      text: `¿Estás seguro de unirte a la sala ${room.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.participant = {
          id: this.userOnline._id,
          name: this.userOnline.name,
          number: numeroAleatorio,
          salaID: room._id,
        };

        this.sorteosService.joinSorteo(room._id, this.participant).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Unido',
              text: 'Te has unido a la sala',
              icon: 'success',
            }).then(() => {
              this.router.navigate(['/room', room._id]);
            });
          },

          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: `No se pudo unir a la sala, ${err.error.message} :(`,
              icon: 'error',
            }).then(() => {
              this.router.navigate(['/room', room._id]);
            });
          },
        });
      }
    });
  }
}
