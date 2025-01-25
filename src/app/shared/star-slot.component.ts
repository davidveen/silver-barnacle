import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { ImageComponent } from './image.component';
import { NumberInputComponent } from './number-input.component';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-star-slot',
  imports: [ImageComponent, ReactiveFormsModule, NumberInputComponent,],
  template: `
    <div class="item-container"
         (doubletap)="onDoubleClick()">
      <app-image [id]="star().id" [width]="80" [height]="80"></app-image>
    </div>
    <form [formGroup]="form">
      <app-number-input formControlName="amount" [min]="1" [max]="maxAvailable()"></app-number-input>
    </form>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 122px;
      margin: 20px 0 0;
      cursor: pointer;
    }

    .item-container {
      text-align: center;
      width: 120px;
      height: calc(120px - 38px);
      border: 1px solid var(--main-border);
      border-radius: 4px;
      transition: all .3s ease-in-out;

      &:hover {
        border: 1px solid var(--focus-border);
        box-shadow: rgba(0, 0, 0, 0.22) 0px 8px 12px;
        transform: translate3d(0px, -1px, 0px);
      }
    }
  `
})
export class StarSlotComponent implements OnInit {
  readonly star = input.required<{ id: number, amount: number }>();
  readonly emptySlots = input.required<number>();

  private fb = inject(NonNullableFormBuilder);

  public amountChanged = output<number>();
  public removeStar = output<void>();
  protected form = this.fb.group<{ amount: number }>({ amount: 0 });

  private get amount(): AbstractControl {
    return this.form.get('amount')!;
  }

  protected maxAvailable = computed(() => {
    return this.emptySlots() + this.amount.value;
  });

  ngOnInit(): void {
    this.amount.patchValue(this.star().amount);

    this.amount.valueChanges.subscribe(value => {
      this.amountChanged.emit(value);
    });
  }

  onDoubleClick() {
    this.removeStar.emit();
  }
}
