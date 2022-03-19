import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '@core/base.component';
import { SpinnerService } from '@services/spinner.service';
import { RoutePaths } from '@defs/route-paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  routePaths = RoutePaths;
  title = 'kedion';

  showNavMenu = false;
  showModulesMenu = false;
  showSpinner = false;
  spinnerText: string | null = '';

  constructor(
    private cdRef: ChangeDetectorRef,
    private spinnerService: SpinnerService,
  ) {
    super();
  }

  hideSideMenu() {
    this.showNavMenu = false;
    this.showModulesMenu = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onBell() {
    // for now, not clear what to do here
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner$.subscribe(
      (val) => {
        this.showSpinner = !!val;
        this.spinnerText = (typeof (val) === 'string' && val !== '') ? val : null;
        this.cdRef.detectChanges();
      }
    );
  }
}
