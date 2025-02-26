import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, Injectable, signal } from '@angular/core';
import { IndexComponent } from './index.component';
import { AppStore } from '@core/app.store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Pokemon } from '@shared/models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { chunk } from '@shared/utils';
import { ScreenSize, ScreensizeService } from '@core/screensize.service';

@Component({
  selector: 'app-pokedex',
  imports: [IndexComponent, ScrollingModule],
  providers: [
    forwardRef(() => MultirowDataSource)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cdk-virtual-scroll-viewport [itemSize]="405" class="viewport">
      <ng-container *cdkVirtualFor="let row of ds">
        <div class="row">
        @for (item of row; track item.id) {
          <app-index  [item]="item" [tabIndex]="0"></app-index>
        }
        </div>
      </ng-container>
    </cdk-virtual-scroll-viewport>
  `,
  styles: `
    :host {
      display: block;
    }

    .row {
      display: flex;
      height: 405px;
      align-content: center;
      justify-content: space-around;
    }

    .viewport {
      height: calc(100vh - 64px);
    }
  `
})
export class PokedexComponent {
  protected store = inject(AppStore);
  protected ds = inject(MultirowDataSource);
}

@Injectable()
class MultirowDataSource extends DataSource<Pokemon[]> {
  store = inject(AppStore);
  screenSize = inject(ScreensizeService);

  private pageSize = 3;
  private rowSize = computed(() => {
    const size = this.screenSize.size() as ScreenSize;
    const sizeMap = {
      'xxl': 5,
      'xl': 4,
      'lg': 3,
      'md': 2,
      'sm': 1
    };
    return sizeMap[size] || 1;
  });
  private viewRange = signal<{ start: number, end: number }>({ start: 0, end: 0 });

  constructor() {
    super();
    effect(() => {
      this.resize(this.rowSize());
    });
    effect(() => {
      this.fetchRange(this.viewRange(), this.length());
    });
  }

  private length = computed(() => {
    return Math.ceil(this.store.filteredList().length / this.rowSize());
  });
  private readonly dataStream = new BehaviorSubject<Pokemon[][]>([]);
  private readonly subscription = new Subscription();

  private cachedData = Array.from({ length: this.length() }) as Pokemon[][];

  connect(cv: CollectionViewer): Observable<Pokemon[][]> {
    this.subscription.add(
      cv.viewChange.subscribe(range => this.viewRange.set(range))
    );

    return this.dataStream;
  }

  disconnect() {
    this.subscription.unsubscribe();
  }

  fetchRange(range: { start: number, end: number }, length: number) {
    const setPage = (page: number, data: Pokemon[][]) => {
      // NB mutates array in-place
      this.cachedData.length = length;
      this.cachedData.splice(
        page * this.pageSize,
        this.pageSize,
        ...data
      );
    };

    const pageFromIndex = (index: number) => Math.floor(index / this.pageSize);
    const start = pageFromIndex(range.start);
    const end = pageFromIndex(range.end) + 1;
    const itemsOnPage = this.pageSize * this.rowSize();

    const pages = Array.from(({ length: end - start }), (_, i) => i + start);
    for (const page of pages) {
      const data = chunk(this.store.getPage(
        page * itemsOnPage,
        page * itemsOnPage + itemsOnPage
      ), this.rowSize());
      setPage(page, data);
    }
    this.dataStream.next(this.cachedData as Pokemon[][]);
  }

  resize(itemsPerRow: number) {
    const currentSize = this.cachedData[0]?.length;
    if (!currentSize || currentSize == itemsPerRow) { return; }

    this.cachedData = chunk<Pokemon>(this.cachedData.flat(), itemsPerRow);
  }
}