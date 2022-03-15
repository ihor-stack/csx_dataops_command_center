import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitWords'
})
export class SplitWordsPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(val: string): string {
    return val
      .replace(/([A-Z][a-z])/g, ' $1') // add space before uppecase letter
      .replace(/_/g, ' ') // replace underscore with spaces
      .replace(/ {1,}/g, ' ') // sequential spaces to one space
      .trim();
  }
}
