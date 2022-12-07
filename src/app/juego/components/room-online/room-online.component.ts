import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SorteosService } from './../../services/sorteos.service';
import { Participant, Sorteo } from '../../interfaces/Sorteo.interface';

@Component({
  selector: 'app-room-online',
  templateUrl: './room-online.component.html',
  styleUrls: ['./room-online.component.scss'],
})
export class RoomOnlineComponent {
  // Variables
  room: any = {};
  jugadores: Participant[] = [];
  userOnline: any = {};
  numeroJugador: number = 0;

  // Constructor
  constructor(
    private sorteosService: SorteosService,
    private activaRuta: ActivatedRoute
  ) {}

  // Lifecycle
  ngOnInit(): void {
    this.onJoinRoom();
  }

  // Methods
  onJoinRoom() {
    const id = this.activaRuta.snapshot.paramMap.get('id');
    this.sorteosService.getSorteo(id).subscribe({
      next: (res: any) => {
        this.room = res.sorteo;
        this.jugadores = res.sorteo.participants;

        // Obtener el numero del jugador
        this.getNumberPlayer(this.jugadores);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getNumberPlayer(jugador: Participant[]) {
    const jugadores = jugador;
    const user = (this.userOnline = JSON.parse(
      localStorage.getItem('userOnline')!
    ));

    // Encontrar el numero del jugador
    jugadores.forEach((jugador) => {
      if (jugador.id === user._id) {
        this.numeroJugador = jugador.number;
      }
    });
  }

  btnPlay() {
    const id = this.activaRuta.snapshot.paramMap.get('id');
    this.sorteosService.startSorteo(id!).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
