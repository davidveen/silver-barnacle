import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set(key: string, value: unknown) {
    const serialised = JSON.stringify(value);
    localStorage.setItem(key, serialised);
  }

  get<T = unknown>(key: string): T | null {
    const value = localStorage.getItem(key);

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
    localStorage.removeItem(key);
  }
}
