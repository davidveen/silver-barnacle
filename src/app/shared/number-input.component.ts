import { Component, computed, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  imports: [],
  template: `
  <label [for]="numberInput">{{label()}}</label>
  <div class="container">
    <button (click)="decrement()">-</button>
    <input #numberInput
          type="number"
          [step]="step()"
          [min]="min()"
          [max]="max()"
          [value]="value"
          (input)="onChange($any($event).target?.value)">
    <button (click)="increment()">+</button>
  </div>
  `,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
  }

  .container {
    display: flex;
    height: 35px;
  }

  button {
    color: white;
    width: 25px;
    height: 25px;
    margin: 0 .3em;
    background-color: var(--div-primary);
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    align-self: center;

    &:hover {
      cursor: pointer;
    }
  }

  label {
    font-size: 16px;
    margin-bottom: .2em;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    width: 60px;
    text-align: center;

    border: 1px solid darkgray;
    border-radius: 4px;
    background-color: #f8f8f8;
  }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {

  readonly step = input<number>(1);
  readonly min = input<number>(1);
  readonly max = input<number>();
  readonly label = input<string>('');

  protected value = 0;
  private readonly input = viewChild<ElementRef>('numberInput');
  private readonly inputElement = computed(() => {
    return this.input()?.nativeElement as HTMLInputElement;
  });

  protected onChange!: (value: number) => void;
  protected onTouched!: (value: number) => void;

  increment() {
    this.inputElement().stepUp();
    this.onChange(Number(this.inputElement().value));
  }

  decrement() {
    this.inputElement().stepDown();
    this.onChange(Number(this.inputElement().value));
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: unknown) => void): void {
    this.onTouched = fn;
  }
}
