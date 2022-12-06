import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './juego/components/login/login.component';
import { RegisterComponent } from './juego/components/register/register.component';
import { RoomsComponent } from './juego/components/rooms/rooms.component';
import { RoomOnlineComponent } from './juego/components/room-online/room-online.component';

// Guards
import { AuthGuard } from './juego/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rooms',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'room/:id',
    component: RoomOnlineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/rooms',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
