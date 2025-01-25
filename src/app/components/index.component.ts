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
    <app-card class="relative">
      @if (item(); as pokemon) {
        @if (isStarred()) {
          <i class="tl-absolute fa-duotone fa-light fa-star fa-lg"></i>
        }
        <div class="tr-absolute secondary">
          {{ pokemon.id }}
        </div>
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
      width: 300px;
      text-align: center;
      margin: 24px auto;
    }

    .title {
      font-size: larger;
      letter-spacing: 2px;
      padding: .5em;
    }

    .relative {
      position: relative;
    }
    .tl-absolute {
      position: absolute;
      top: 20px;
      right: 12px;
    }
    .tr-absolute {
      position: absolute;
      top: 12px;
      left: 12px;
    }
    .secondary {
      font-size: smaller;
      color: gray;
      font-family: monospace;
    }
  `
})
export class IndexComponent {
  store = inject(AppStore);

  readonly item = input.required<Pokemon>();

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
