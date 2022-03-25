import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent implements OnInit {
  // constructor() { }

  form = new FormGroup({
    message: new FormControl('', [Validators.required]),
    alias: new FormControl(''),
    description: new FormControl(''),
    /*
    responders: [{
      "name": "Name",
      "type": "team"
    }],
    visible_to: [{
      "name": "Sample name",
      "type": "team"
    }],
    actions: ["Restart", "AnExampleAction"],
    tags: ["OverwriteQuietHours"],
    details: {
      "details key1": "value1",
      "details key2": "value2"
    },
    */
    entity: new FormControl(''),
    source: new FormControl(''),
    priority: new FormControl(''),
    user: new FormControl(''),
    note: new FormControl(''),
  });

  dummy:boolean = false;

  ngOnInit(): void {
    this.dummy = true;
  }

  onCreate() {
    this.dummy = true;
  }

  fieldHasErr(fieldName: string, errKey: string) {
    const field = this.form.get(fieldName);

    return field
      && field.invalid
      && field.errors
      && (field.dirty || field.touched)
      && field.hasError(errKey);
  }
}
