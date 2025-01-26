import { afterNextRender, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map, throttleTime } from 'rxjs';

export type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

@Injectable({
  providedIn: 'root'
})
export class ScreensizeService {
  private _size$ = new BehaviorSubject<ScreenSize>('sm');
  public readonly size = toSignal<string>(this._size$);

  constructor() {
    afterNextRender({
      read: () => {
        fromEvent(window, 'resize')
          .pipe(
            throttleTime(50),
            map(() => this.getSize(window.innerWidth)),
            distinctUntilChanged(),
          )
          .subscribe(size => this._size$.next(size));

        // set initial size
        this._size$.next(this.getSize(window.innerWidth));
      }
    });
  }

  getSize(width: number): ScreenSize {
    return width >= 1600 ? 'xxl'
      : width >= 1300 ? 'xl'
        : width >= 992 ? 'lg'
          : width >= 768 ? 'md'
            : 'sm';
  }
}
