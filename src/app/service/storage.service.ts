import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { ServerType } from '../enums/server-type.enum';

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

    if (environment.serverType === ServerType.EXPRESS) {
      return data;
    }

    return data ? JSON.parse(data) : null;
  }

  public saveSession(token: any): void {
    const tokenString = environment.serverType === ServerType.EXPRESS ? token : JSON.stringify({ token });
    this.set(STORAGE_NAME, tokenString);
  }

  public deleteSession(): void {
    this._storage.remove(STORAGE_NAME);
  }
}
