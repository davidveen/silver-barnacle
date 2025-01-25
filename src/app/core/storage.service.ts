import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

class NoopStorage implements Storage {
  length = 0;
  getItem(_key: string) { return null; }
  setItem(_key: string, _value: unknown) { return; }
  removeItem(_key: string) { return; }
  clear() { return; }
  key(_index: number) { return null; }
}

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory() {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId)
      ? localStorage
      : new NoopStorage();
  }
});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storage = inject(BROWSER_STORAGE);

  set(key: string, value: unknown) {
    const serialised = JSON.stringify(value);
    this.storage.setItem(key, serialised);
  }

  get<T = unknown>(key: string): T | null {
    const value = this.storage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
}
