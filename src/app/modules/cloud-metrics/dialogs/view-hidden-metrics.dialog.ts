import {
  Component, Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HiddenMetric } from '@defs/metrics';

@Component({
  selector: 'app-view-hidden-metrics',
  templateUrl: './view-hidden-metrics.dialog.html',
  styleUrls: ['./view-hidden-metrics.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ViewHiddenMetricsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public hidden: HiddenMetric[]
  ) {}
}
