import { Component, computed, effect, inject, output, Signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatIconButton],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label for="search">Search</mat-label>
        <input #search matInput type="text" formControlName="search" />
        @if (hasValue()) {
          <button matSuffix mat-icon-button aria-label="Clear" (click)="onClear()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>
    </form>
  `,
  styles: `
    :host {
      display: block;
      margin: 0 12px;
    }
    ::ng-deep {
      div.mat-mdc-form-field-subscript-wrapper {
        height: 0px;
      }
    }
    mat-form-field {
      width: 200px;
    }
  `
})
export class SearchComponent {
  private fb = inject(NonNullableFormBuilder);
  searchChange = output<string>();

  protected value: Signal<string | undefined>;
  protected hasValue = computed(() => !!this.value());
  protected form = this.fb.group({ search: '' });

  constructor() {
    this.value = toSignal<string>(
      this.form.get('search')!.valueChanges
        .pipe(debounceTime(120))
    );

    effect(() => {
      this.searchChange.emit(this.value() ?? '');
    });
  }

  onClear() {
    this.form.reset();
  }
}
