import {
  Component, Inject, OnInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HiddenMetric } from '@defs/metrics';

@Component({
  selector: 'app-view-hidden-metrics',
  templateUrl: './view-hidden-metrics.dialog.html',
  styleUrls: ['./view-hidden-metrics.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ViewHiddenMetricsComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hidden: HiddenMetric[] },
    private dialogRef: MatDialogRef<ViewHiddenMetricsComponent>
  ) { }

  ngOnInit(): void {
    this.data.hidden.forEach((item) => {
      this.form.addControl(item.metric, new FormControl(false));
    });
  }

  onShowHiddenMetrics() {
    const showMetrics = Object.keys(this.form.value).filter((key) => this.form.value[key]);

    this.dialogRef.close({ showMetrics });
  }
}
