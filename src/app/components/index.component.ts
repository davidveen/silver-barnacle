import { Component, HostListener, input, output } from '@angular/core';
import { CardComponent } from '@shared/card.component';
import { Pokemon } from '@shared/models';
import { ImageComponent } from "@shared/image.component";
import { StatsComponent } from '@shared/stats.component';

@Component({
  selector: 'app-index',
  imports: [CardComponent, ImageComponent, StatsComponent],
  template: `
    <app-card>
      @if (item(); as pokemon) {
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
  `
})
export class IndexComponent {
  readonly item = input.required<Pokemon>();
  readonly starred = output<void>();

  @HostListener('dblclick', ['$event']) click(event: MouseEvent) {
    event.preventDefault();
    this.starred.emit();
  }
}
