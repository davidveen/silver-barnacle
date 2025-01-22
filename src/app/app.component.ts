import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppStore } from '@core/app.store';
import { StarredComponent } from "./components/starred.component";
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
    StarredComponent
  ],
  template: `
  <mat-toolbar>
    <div>
      {{ title }}
    </div>
    <div class="spacer">
      <button mat-icon-button
          [matBadge]="store.numberOfStars()"
          (click)="onSwitchSidebar()" 
          (keydown.enter)="onSwitchSidebar()" >
        <i class="fa-star fix-margin"
          [ngClass]="store.isSidebarOpen() ? 'fa-solid' : 'fa-duotone'">
        </i>
      </button>
    </div>
  </mat-toolbar>

  <mat-sidenav-container class="full-page">
    <mat-sidenav [opened]="store.isSidebarOpen()" (openedChange)="store.updateSidebarOpened($event)" position="end">
      @defer (on viewport) {
        <app-starred></app-starred>
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

  onSwitchSidebar() {
    this.store.updateSidebarOpened(!this.store.isSidebarOpen());
  }
}
