import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './range-slider.component';
import { ReactiveFormsModule } from '@angular/forms';

const PUBLIC_COMPONENTS = [
  RangeSliderComponent,
];

const PUBLIC_MODULES = [
  ReactiveFormsModule,
]

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
  ],
  exports: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_MODULES,
  ],
  imports: [
    CommonModule,
    ...PUBLIC_MODULES,
  ]
})
export class RangeSliderModule { }
