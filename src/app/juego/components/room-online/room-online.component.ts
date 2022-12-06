import { Component } from '@angular/core';

@Component({
  selector: 'app-room-online',
  templateUrl: './room-online.component.html',
  styleUrls: ['./room-online.component.scss'],
})
export class RoomOnlineComponent {
  // Variables

  // Constructor
  constructor() {}

  // Lifecycle
  ngOnInit(): void {
    console.log('RoomOnlineComponent initialized');
  }

  // Methods

  // TODO: Implementar
  public onJoinRoom() {
    console.log('Joining room');
  }

  public onCreateRoom() {
    console.log('Creating room');
  }

  public onBack() {
    console.log('Back');
  }
}
