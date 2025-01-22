import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppStore } from '@core/app.store';
import { FavouritesComponent } from "./components/favourites.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatSidenavModule,
    MatIconButton,
    MatBadge,
    MatProgressBarModule,
    NgClass,
    FavouritesComponent
  ],
  template: `
  <mat-toolbar>
    <div>
      {{ title }}
    </div>
    <div class="spacer">
      <button mat-icon-button
          [matBadge]="store.numberOfFavs()"
          (click)="onSwitchFavsWidget()" 
          (keydown.enter)="onSwitchFavsWidget()" >
        <i class="fa-star fix-margin"
          [ngClass]="store.isFavsOpen() ? 'fa-solid' : 'fa-duotone'">
        </i>
      </button>
    </div>
  </mat-toolbar>

  <mat-sidenav-container class="full-page">
    <mat-sidenav [opened]="store.isFavsOpen()" (openedChange)="store.updateFavsOpened($event)" position="end">
      @defer (on viewport) {
        <app-favourites></app-favourites>
      } @placeholder {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
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
  .clickable {
    cursor: pointer;
  }
  .spacer {
    width: 165px;
    text-align: center;
  }
  .fix-margin {
    margin-left: -1px;
  }
  `
})
export class AppComponent {
  protected title = 'Divodex';
  protected store = inject(AppStore);

  onSwitchFavsWidget() {
    this.store.updateFavsOpened(!this.store.isFavsOpen());
  }
}
