import { Component } from '@angular/core';
import { ImageComponent } from './image.component';

@Component({
  selector: 'app-logo',
  imports: [ImageComponent],
  template: `
    <b>div</b>
    <app-image [id]="143" [width]="40" [height]="40"></app-image>
    <span>dex</span>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
    }
  `
})
export class LogoComponent { }
