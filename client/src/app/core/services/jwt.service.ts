import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private storageName = LocalStorageKeys.JWT_TOKEN;

  getToken(): string | null {
    return window.localStorage.getItem(this.storageName);
  }

  saveToken(jwtToken: string): void {
    window.localStorage.setItem(this.storageName, jwtToken);
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.storageName);
  }
}
