/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  isLogged$ = new BehaviorSubject<boolean>(true);

  isLogged() {
    return this.isLogged$.value;
  }

  login() {
    //
  }

  logout() {
    //
  }
}
