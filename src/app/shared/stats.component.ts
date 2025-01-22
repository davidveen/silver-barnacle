import { Component, input } from '@angular/core';
import { Stats } from './models';

@Component({
  selector: 'app-stats',
  imports: [],
  template: `
    <div>
      <i class="fa-duotone fa-heart fa-lg"></i>
      <div>{{ stats().HP }}</div>
    </div>
    <div>
      <i class="fa-duotone fa-bolt-lightning fa-lg"></i>
      <div>{{ stats().Attack }}</div>
    </div>
    <div>
      <i class="fa-duotone fa-shield fa-lg"></i>
      <div>{{ stats().Defense }}</div>
    </div>
    <div>
      <i class="fa-duotone fa-gauge-max fa-lg"></i>
      <div>{{ stats().Speed }}</div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: .5em .5em 0;
      font-family: monospace;
      font-size: larger;
      border-top: 1px solid #efefef;
    }

    div {
      width: 50px;
      text-align: center;
    }

    i {
      padding-bottom: 14px;
    }
  `
})
export class StatsComponent {
  readonly stats = input.required<Stats>();
}
