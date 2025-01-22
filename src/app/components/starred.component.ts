import { Component, computed, inject } from '@angular/core';
import { AppStore } from '@core/app.store';
import { EmptySlotComponent } from '@shared/empty-slot.component';
import { StarSlotComponent } from "../shared/star-slot.component";

@Component({
  selector: 'app-starred',
  imports: [EmptySlotComponent, StarSlotComponent],
  template: `
    @for (star of store.starList(); track star.id) {
      <app-star-slot [star]="star" 
                    [emptySlots]="emptySlots().length"
                    (amountChanged)="onAmountChanged(star.id, $event)"
                    (removeStar)="onRemoveStar(star.id)">
      </app-star-slot>
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
export class StarredComponent {
  readonly store = inject(AppStore);

  protected readonly emptySlots = computed(() => {
    const length = this.store.maxSlots - this.store.numberOfStars();
    return Array.from({ length });
  });

  onAmountChanged(id: number, value: number) {
    this.store.updateAmount(id, value);
  }

  onRemoveStar(id: number) {
    this.store.removeStar(id);
  }
}
