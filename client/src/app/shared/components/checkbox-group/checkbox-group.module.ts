import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';

const PUBLIC_COMPONENTS = [
  CheckboxGroupComponent,
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
  ],
})
export class CheckboxGroupModule { }
