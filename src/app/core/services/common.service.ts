import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface WindowSize {
  width: number;
  height: number;
}

@Injectable()
export class CommonService {
  resizeWindow$: Subject<WindowSize>;

  constructor() {
    this.resizeWindow$ = new Subject<WindowSize>();
  }
}
