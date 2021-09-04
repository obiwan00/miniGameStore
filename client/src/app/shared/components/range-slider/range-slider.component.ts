import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false
  @Input() minValue: number = 0
  @Input() maxValue: number = 0
  @Input() currentInputValue: number = -1
  @Output() formEmitter = new EventEmitter<number>()
  public formGroup = new FormGroup({
    range: new FormControl('0')
  })

  constructor() { }

  ngOnChanges() {
    this.currentInputValue = Math.ceil(this.currentInputValue);
    this.maxValue = Math.ceil(this.maxValue);
    this.currentValue = this.currentInputValue < this.minValue ? this.maxValue :  this.currentInputValue

    this.disabled ? this.formGroup.disable() : this.formGroup.enable()
  }

  ngOnInit(): void {

  }

  get rangeControl() {
    return this.formGroup?.get('range')
  }

  get currentValue() {
    return this.rangeControl?.value
  }

  set currentValue(value: number) {
    this.rangeControl?.setValue(value);
  }

  onChange() {
    this.formEmitter.emit(this.currentValue)
  }
}
