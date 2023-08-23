import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_NAME = 'minthegym';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    // this.init();
  }

  public async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  public async getSession(): Promise<any> {
    const data = await this.get(STORAGE_NAME);
    return data ? JSON.parse(data) : null;
  }

  public saveSession(token): void {
    this.set(STORAGE_NAME, JSON.stringify({ token }));
  }

  public deleteSession(): void {
    this._storage.remove(STORAGE_NAME);
  }
}
