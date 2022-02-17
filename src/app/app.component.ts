import { Component } from '@angular/core';
import { BaseComponent } from '@core/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'kedion';

  showNavMenu = false;
  showModulesMenu = false;

  hideSideMenu() {
    this.showNavMenu = false;
    this.showModulesMenu = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onBell() {
    //
  }
}
