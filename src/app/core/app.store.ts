import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { Pokemon } from '@shared/models';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

type Favs = Record<number, { id: number, amount: number }>
interface AppState {
  favs: Favs
  isFavsOpen: boolean
  pokedex: Pokemon[]
}

const initialState: AppState = {
  favs: {},
  isFavsOpen: false,
  pokedex: []
};

const MAX_SLOTS = 6;
const STORAGE_KEY = 'favs';
const NOOP = (_x: unknown) => null;

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(_store => ({ maxSlots: MAX_SLOTS })),
  withMethods(() => {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
      return {
        setStorage: NOOP,
        getStorage: NOOP
      };
    }

    const storage = inject(StorageService);

    return {
      setStorage: storage.set,
      getStorage: storage.get
    };
  }),
  withHooks({
    onInit(store) {
      // get pokedex from API
      const http = inject(HttpClient);
      const url = environment.api + '/pokedex';
      http.get<Pokemon[]>(url)
        .subscribe(result => patchState(store, () => ({ pokedex: result })));

      // get favourites from local storage
      const favs = store.getStorage<Favs>(STORAGE_KEY);

      if (favs) {
        patchState(store, () => ({ favs }));
      }
    }
  }),
  withComputed(({ favs }) => ({
    numberOfFavs: computed(() => {
      return Object.values(favs()).reduce((a, b) => {
        return a + b.amount;
      }, 0);
    }),
    favList: computed(() => Object.values(favs())),
    favIds: computed(() => Object.keys(favs()).map(Number))
  })),
  withMethods(store => ({
    updateFavsOpened(to: boolean) {
      patchState(store, () => ({ isFavsOpen: to }));
    },
    updateAmount(id: number, amount: number) {
      patchState(store, () => ({
        favs: { ...store.favs(), [id]: { id, amount } }
      }));
    },
    addFav(id: number) {
      if (store.favIds().includes(id)) { return; }
      if (store.favIds().length == store.maxSlots) { return; }

      patchState(store, () => ({
        favs: { ...store.favs(), [id]: { id, amount: 1 } }
      }));

      store.setStorage(STORAGE_KEY, store.favs());
    },
    removeFav(id: number) {
      if (!store.favIds().includes(id)) { return; }
      const { [id]: _, ...rest } = store.favs();
      patchState(store, () => ({
        favs: { ...rest }
      }));

      store.setStorage(STORAGE_KEY, store.favs());
    }
  }))
);