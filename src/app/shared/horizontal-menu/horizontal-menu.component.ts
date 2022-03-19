/* eslint-disable @angular-eslint/component-selector */
import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { NameValueItem } from '@defs/common';

export interface HorizontalMenuItem extends NameValueItem {
  order: number;
}

export interface HorizontalMenuEvent {
  value: string;
  event: MouseEvent;
}

@Component({
  selector: 'horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent {
  showAllItems = false;

  @Input() items: any[] = [];
  @Input() activeItem: string = '';
  @Output() selectedItem = new EventEmitter<HorizontalMenuEvent>();

  switchItem(itemKey: string, event: MouseEvent) {
    this.showAllItems = false;
    this.selectedItem.emit({ value: itemKey, event });
  }
}
