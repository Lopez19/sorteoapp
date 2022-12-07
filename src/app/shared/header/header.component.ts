import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../juego/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Variables

  // Constructor
  constructor(public authService: AuthService, private router: Router) {}

  // Ciclo de vida
  ngOnInit(): void {}

  // Métodos
  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
