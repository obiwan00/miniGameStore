import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';

const PUBLIC_COMPONENTS = [
  LoaderComponent,
];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
  ],
  exports: [
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
  ]
})
export class LoaderModule { }
