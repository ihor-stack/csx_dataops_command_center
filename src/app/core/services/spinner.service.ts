import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  showSpinner$ = new BehaviorSubject<boolean | string>(false);

  show(val: boolean | string) {
    this.showSpinner$.next(val);
  }
}
