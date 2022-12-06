import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../juego/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Variables
  constructor(private authService: AuthService, private router: Router) {}

  // Ciclo de vida

  // Métodos
  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
