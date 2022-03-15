import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinkPipe } from '@core/pipes/link.pipe';
import { SplitWordsPipe } from '@core/pipes/split-words.pipe';

// const components = [];
// const directives = [];
const pipes = [
  LinkPipe,
  SplitWordsPipe,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // ...components,
    // ...directives,
    ...pipes
  ],
  exports: [
    // ...components,
    // ...directives,
    ...pipes,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SharedModule {}
