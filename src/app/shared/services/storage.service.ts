import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly #storage = localStorage;

  get<T>(key: string): T | null {
    const value = this.#storage.getItem(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  }

  set(key: string, value: unknown) {
    this.#storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.#storage.removeItem(key);
  }
}
