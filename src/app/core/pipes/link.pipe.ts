import { Pipe, PipeTransform } from '@angular/core';
import { RoutePaths } from '@defs/route-paths';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  transform(route: RoutePaths, ...params: any): any[] {
    return [`/${route}`, ...params];
  }
}
