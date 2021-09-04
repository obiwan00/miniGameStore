import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private storageName = 'jwtToken';

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
