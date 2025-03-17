import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  public setCredentials(username: string, password: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  public getCredentials() {
    return {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    };
  }

  public clearCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
