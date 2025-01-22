import { Component, computed, inject } from '@angular/core';
import { AppStore } from '@core/app.store';
import { EmptySlotComponent } from '@shared/empty-slot.component';
import { FavSlotComponent } from "../shared/fav-slot.component";

@Component({
  selector: 'app-favourites',
  imports: [EmptySlotComponent, FavSlotComponent],
  template: `
    @for (fav of store.favList(); track fav.id) {
      <app-fav-slot [fav]="fav" 
                    [emptySlots]="emptySlots().length"
                    (amountChanged)="onAmountChanged(fav.id, $event)"
                    (removeFav)="onRemoveFav(fav.id)">
      </app-fav-slot>
    }

    @for (slot of emptySlots(); track $index) {
      <app-empty-slot></app-empty-slot>
    }
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }
  `
})
export class FavouritesComponent {
  readonly store = inject(AppStore);

  protected readonly emptySlots = computed(() => {
    const length = this.store.maxSlots - this.store.numberOfFavs();
    return Array.from({ length });
  });

  onAmountChanged(id: number, value: number) {
    this.store.updateAmount(id, value);
  }

  onRemoveFav(id: number) {
    this.store.removeFav(id);
  }
}
