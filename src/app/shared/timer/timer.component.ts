import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SorteosService } from '../../juego/services/sorteos.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  // Output
  @Output() ganador = new EventEmitter<string>();

  // Variables
  dateSorteo: Date = new Date('2021-12-31T23:59:59');
  now: Date = new Date();

  dias: string = '00';
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';

  winner: string = '';

  // Constructor
  constructor(
    private sorteosService: SorteosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  inter = setInterval(() => {
    this.getFecha();
  }, 1000);

  // Lifecycle
  ngOnInit(): void {
    this.inter;
  }

  // Methods
  getFecha = () => {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.sorteosService.getSorteo(id).subscribe({
        next: (res: any) => {
          this.dateSorteo = new Date(res.sorteo.date);
          this.now = new Date();

          // Mostrar en el DOM
          this.viewTimer();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  };

  // Calculos de tiempo restante para el sorteo
  getDays = () => {
    const diff = this.dateSorteo.getTime() - this.now.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  getHours = () => {
    const diff = this.dateSorteo.getTime() - this.now.getTime();
    const diffHours = Math.floor(
      (diff - this.getDays() * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)
    );
    return diffHours;
  };

  getMinutes = () => {
    const diff = this.dateSorteo.getTime() - this.now.getTime();
    const diffMinutes = Math.floor(
      (diff -
        this.getDays() * 1000 * 60 * 60 * 24 -
        this.getHours() * 1000 * 60 * 60) /
        (1000 * 60)
    );
    return diffMinutes;
  };

  getSeconds = () => {
    const diff = this.dateSorteo.getTime() - this.now.getTime();
    const diffSeconds = Math.floor(
      (diff -
        this.getDays() * 1000 * 60 * 60 * 24 -
        this.getHours() * 1000 * 60 * 60 -
        this.getMinutes() * 1000 * 60) /
        1000
    );
    return diffSeconds;
  };

  // Mostrar en el DOM
  getDaysDOM = () => {
    const days = this.getDays();
    return days < 10 ? '0' + days : days;
  };

  getHoursDOM = () => {
    const hours = this.getHours();
    return hours < 10 ? '0' + hours : hours;
  };

  getMinutesDOM = () => {
    const minutes = this.getMinutes();
    return minutes < 10 ? '0' + minutes : minutes;
  };

  getSecondsDOM = () => {
    const seconds = this.getSeconds();
    return seconds < 10 ? '0' + seconds : seconds;
  };

  // Ver los cambios en el DOM
  viewTimer = () => {
    if (!this.isFinished()) {
      this.dias = `${this.getDaysDOM()}`;
      this.horas = `${this.getHoursDOM()}`;
      this.minutos = `${this.getMinutesDOM()}`;
      this.segundos = `${this.getSecondsDOM()}`;
    } else {
      if (this.isFinished()) {
        // Si el contador ya terminó
        this.dias = '00';
        this.horas = '00';
        this.minutos = '00';
        this.segundos = '00';

        // Detener el contador
        clearInterval(this.inter);

        // Iniciar el sorteo
        this.start();
      }
    }
  };

  // Verificar si el contador ya terminó
  isFinished = (): boolean => {
    return this.now.getTime() > this.dateSorteo.getTime();
  };

  // Start
  start = () => {
    if (this.isFinished()) {
      const id = this.activatedRoute.snapshot.params['id'];

      this.sorteosService.startSorteo(id).subscribe({
        next: (res: any) => {
          if (res === null) {
            this.sorteosService.getSorteo(id).subscribe({
              next: (res: any) => {
                this.winner = res.sorteo.winner.number.toString();
                this.ganador.emit(this.winner);

                // Enviar alerta
                Swal.fire({
                  title: 'El sorteo ha terminado :)',
                  text: `El ganador es el número ${this.winner}`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Redireccionar
                    this.router.navigateByUrl('/');
                  }
                });
              },
            });
          }
        },
      });
    }
  };
}
