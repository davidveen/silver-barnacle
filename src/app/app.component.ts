import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppStore } from '@core/app.store';
import { StarredComponent } from "./components/starred.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToolbarComponent } from './components/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatProgressBarModule,
    ToolbarComponent,
    StarredComponent
  ],
  template: `
  <app-toolbar></app-toolbar>

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
  `
})
export class AppComponent {
  protected store = inject(AppStore);

  onSwitchSidebar() {
    this.store.updateSidebarOpened(!this.store.isSidebarOpen());
  }
}
