import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styles: `
    :host {
      display: block;
      border-radius: 4px;
      border: 1px solid var(--main-border);
      cursor: pointer;
      
      transition: all .3s ease-in-out;

      &:hover {
        border: 1px solid var(--focus-border);
        box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
        transform: translate3d(0px, -1px, 0px);
      }
    }
  `
})
export class CardComponent { }
