/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren
} from '@angular/core';
import { NameValueItem } from '@defs/common';
import { merge } from 'rxjs';
import { CommonService } from '@services/common.service';

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
export class HorizontalMenuComponent implements AfterViewInit {
  showAllItems = false;
  showExpandButton = false;

  @Input() items: HorizontalMenuItem[] = [];
  @Input() activeItem: string = '';
  @Output() selectedItem = new EventEmitter<HorizontalMenuEvent>();
  @ViewChildren('menuTags') menuTags!: QueryList<ElementRef>;

  constructor(
    private commonService: CommonService,
  ) {}

  ngAfterViewInit(): void {
    merge(
      this.menuTags.changes,
      this.commonService.resizeWindow$
    ).subscribe(() => {
      this.showExpandButton = this.menuTags.reduce(
        (acc, tag) => acc || (tag.nativeElement.offsetTop > 0),
        false as boolean
      );
    });
  }

  switchItem(itemKey: string, event: MouseEvent) {
    this.showAllItems = false;
    this.selectedItem.emit({ value: itemKey, event });
  }
}
