import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatSidenavModule,
    MatBadge,
  ],
  template: `
  <mat-toolbar>
    <div>
      {{ title }}
    </div>
    @defer {
      <div matBadge="6">
        <i class="fa-duotone fa-solid fa-heart-half-stroke fa-lg"></i>
      </div>
    }
  </mat-toolbar>

  <mat-sidenav-container class="full-page">
    <mat-sidenav [(opened)]="opened" position="end">
        Team
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .full-page {
    flex-grow: 1;
  }
  `
})
export class AppComponent {
  title = 'Divomon';
  opened = true;
}
