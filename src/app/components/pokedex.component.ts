import { Component, inject } from '@angular/core';
import { IndexComponent } from './index.component';
import { AppStore } from '@core/app.store';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-pokedex',
  imports: [IndexComponent, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport [itemSize]="356.98" class="viewport">
      <ng-container *cdkVirtualFor="let item of store.filteredList()">
        <app-index  [item]="item" [tabIndex]="0"></app-index>
      </ng-container>
    </cdk-virtual-scroll-viewport>
  `,
  styles: `
    :host {
      display: block;
    }

    .viewport {
      height: calc(100vh - 64px);
    }
  `
})
export class PokedexComponent {
  protected store = inject(AppStore);

}
