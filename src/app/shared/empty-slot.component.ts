import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-slot',
  imports: [],
  template: ``,
  styles: `
    :host {
      display: block;
      width: 120px;
      height: 120px;
      border: 1px solid var(--main-border);
      border-radius: 4px;
      margin: 20px auto 0;
      background-color: #efefef;
    }
  `
})
export class EmptySlotComponent {

}
