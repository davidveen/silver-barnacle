import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { environment } from '@env';
import { padZero } from './utils';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-image',
  imports: [NgOptimizedImage],
  template: `
    @if (id()) {
      <img [ngSrc]="src()" [width]="width()" [height]="height()" [alt]="alt()" [priority]="priority()"/>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class ImageComponent {

  readonly id = input.required<number, number | string>({ transform: coerceNumberProperty });
  readonly alt = input<string>('avatar image');
  readonly width = input<number>(100);
  readonly height = input<number>(100);
  readonly type = input<'thumbnail' | 'image'>('thumbnail');
  readonly priority = input<boolean, boolean | string>(true, { transform: coerceBooleanProperty });

  protected src = computed(() => {
    return this.type() == 'thumbnail'
      ? `${environment.static}/thumbnails/${padZero(this.id()!)}.png`
      : `${environment.static}/images/${padZero(this.id()!)}.png`;
  });
}
