import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinkPipe } from '@core/pipes/link.pipe';
import { SplitWordsPipe } from '@core/pipes/split-words.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { HorizontalMenuComponent } from '@app/shared/horizontal-menu/horizontal-menu.component';

const components = [
  HorizontalMenuComponent,
];

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
];

// const directives = [];

const pipes = [
  LinkPipe,
  SplitWordsPipe,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],

  declarations: [
    ...components,
    ...pipes,
    // ...directives,
  ],

  exports: [
    ...components,
    // ...directives,
    ...pipes,
    FormsModule,
    ReactiveFormsModule,
    ...modules
  ]
})

export class SharedModule {}
