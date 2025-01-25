import { Component, computed, HostListener, inject, input } from '@angular/core';
import { CardComponent } from '@shared/card.component';
import { Pokemon } from '@shared/models';
import { ImageComponent } from "@shared/image.component";
import { StatsComponent } from '@shared/stats.component';
import { AppStore } from '@core/app.store';

@Component({
  selector: 'app-index',
  imports: [CardComponent, ImageComponent, StatsComponent],
  template: `
    <app-card>
      @if (item(); as pokemon) {
        @if (isStarred()) {
          <i class="tl-absolute fa-duotone fa-light fa-star fa-lg"></i>
        }
        <app-image [id]="pokemon.id" [height]="250" [width]="250" type="image"></app-image>
        <div class="title">
          {{ pokemon.name.english }}
        </div>
        <app-stats [stats]="pokemon.base"></app-stats>
      }
    </app-card>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 300px;
      text-align: center;
      margin: 24px auto;
    }

    .title {
      font-size: larger;
      letter-spacing: 2px;
      padding: .5em;
    }

    .tl-absolute {
      position: absolute;
      top: 20px;
      right: 12px;
    }
  `
})
export class IndexComponent {
  readonly item = input.required<Pokemon>();

  store = inject(AppStore);

  protected isStarred = computed(() => {
    return this.store.starIds().includes(this.item().id);
  });

  @HostListener('keydown.enter', ['$event'])
  @HostListener('doubletap', ['$event']) activate(event: KeyboardEvent | HammerInput) {
    event.preventDefault();
    this.toggleStarred();
  }

  toggleStarred() {
    if (this.isStarred()) {
      this.store.removeStar(this.item().id);
    } else {
      this.store.addStar(this.item().id);
    }
  }
}
