import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  showSpinner$ = new BehaviorSubject<boolean>(false);

  show(val: boolean) {
    this.showSpinner$.next(val);
  }
}
