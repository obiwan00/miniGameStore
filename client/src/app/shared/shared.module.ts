import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';

const PUBLIC_COMPONENTS: any[] = [
  SearchBarComponent,
  CheckboxGroupComponent,
  LoaderComponent,
  RangeSliderComponent,
];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];
const PUBLIC_MODULES: any[] = [
  ReactiveFormsModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ...PUBLIC_MODULES,
  ],
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
  exports: [
    CommonModule,
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
    ...PUBLIC_MODULES,
  ]
})
export class SharedModule { }
