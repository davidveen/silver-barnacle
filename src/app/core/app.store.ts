import { patchState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Pokemon } from '@shared/models';
import { LocalStorageService } from './storage.service';

type Stars = Record<number, { id: number, amount: number }>
interface AppState {
  stars: Stars
  filter: string
  isSidebarOpen: boolean
  pokedex: Pokemon[]
}

const initialState: AppState = {
  stars: {},
  filter: '',
  isSidebarOpen: false,
  pokedex: []
};

const MAX_SLOTS = 6;
const STORAGE_KEY = 'stars';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorage(),
  withProps(_store => ({ maxSlots: MAX_SLOTS })),
  withHooks({
    onInit(store) {
      // get pokedex from API
      const http = inject(HttpClient);
      const url = environment.api + '/pokedex';
      http.get<Pokemon[]>(url)
        .subscribe(result => patchState(store, () => ({ pokedex: result })));

      // get favourites from local storage
      const stars = store.storage.get<Stars>(STORAGE_KEY);

      if (stars) {
        patchState(store, () => ({ stars: stars }));
      }
    }
  }),
  withComputed(({ pokedex, filter, stars }) => ({
    filteredList: computed(() => {
      if (!filter()) {
        return pokedex();
      } else {
        return pokedex().filter(({ name }) => name.english
          .toLowerCase()
          .includes(filter()));
      }
    }),
    numberOfStars: computed(() => {
      return Object.values(stars()).reduce((a, b) => {
        return a + b.amount;
      }, 0);
    }),
    starList: computed(() => Object.values(stars())),
    starIds: computed(() => Object.keys(stars()).map(Number))
  })),
  withMethods(store => ({
    updateSidebarOpened(to: boolean) {
      patchState(store, () => ({ isSidebarOpen: to }));
    },
    updateAmount(id: number, amount: number) {
      patchState(store, () => ({
        stars: { ...store.stars(), [id]: { id, amount } }
      }));
    },
    updateFilter(filter: string) {
      patchState(store, () => ({ filter }));
    },
    addStar(id: number) {
      if (store.starIds().includes(id)) { return; }
      if (store.starIds().length == store.maxSlots) { return; }

      patchState(store, () => ({
        stars: { ...store.stars(), [id]: { id, amount: 1 } }
      }));

      store.storage.set(STORAGE_KEY, store.stars());
    },
    removeStar(id: number) {
      if (!store.starIds().includes(id)) { return; }
      const { [id]: _, ...rest } = store.stars();
      patchState(store, () => ({
        stars: { ...rest }
      }));

      store.storage.set(STORAGE_KEY, store.stars());
    },
    getPage(start: number, end: number) {
      return store.filteredList().slice(start, end);
    }
  }))
);

function withStorage() {
  return signalStoreFeature(
    withProps(_store => ({ storage: inject(LocalStorageService) }))
  );
}