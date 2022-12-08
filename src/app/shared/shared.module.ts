import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [HeaderComponent, TimerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, TimerComponent],
})
export class SharedModule {}
