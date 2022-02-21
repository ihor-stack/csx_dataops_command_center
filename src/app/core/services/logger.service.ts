/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { Injectable } from '@angular/core';
import { environment } from '@env';

export interface ILoggerService {
  log(message?: any, ...optionalParams: any[]): void;
}

@Injectable()
export class LoggerService implements ILoggerService {
  log(message?: any, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.log(message, ...optionalParams);
    }
  }
}
