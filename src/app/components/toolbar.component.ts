import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { AppStore } from '@core/app.store';
import { LogoComponent } from '@shared/logo.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatBadge,
    NgClass,
    LogoComponent,
  ],
  template: `
  <mat-toolbar>
    <app-logo></app-logo>
    <div>
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
  `,
  styles: `
    :host {
      display: block;
    }

    .fix-margin {
      margin-left: -1px;
    }
  `
})
export class ToolbarComponent {
  protected store = inject(AppStore);

  onSwitchSidebar() {
    this.store.updateSidebarOpened(!this.store.isSidebarOpen());
  }
}
