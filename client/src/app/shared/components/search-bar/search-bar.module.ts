import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

const PUBLIC_COMPONENTS = [
  SearchBarComponent,
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
export class SearchBarModule { }
