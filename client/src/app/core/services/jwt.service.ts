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

  saveToken(jwtToken: string) {
    window.localStorage.setItem(this.storageName, jwtToken);
  }

  destroyToken() {
    window.localStorage.removeItem(this.storageName);
  }
}
