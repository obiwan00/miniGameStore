import { Component, EventEmitter, Input, OnChanges,  OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { CheckboxData } from './checkbox-data.model';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false
  @Input() checkboxesDataInput: CheckboxData[] = []
  @Output() formEmitter = new EventEmitter<string[]>()
  @ViewChild('form') form: NgForm
  public checkboxesGroup: FormGroup = new FormGroup({
    checkboxes: new FormArray([])
  });

  constructor() { }

  ngOnChanges(): void {
    this.checkboxesFormArray.clear()
    this.checkboxesDataInput = this.checkboxesDataInput?.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })
    this.checkboxesDataInput?.forEach((data, i) => {
      this.checkboxesFormArray.push(new FormGroup({ [data.name]: new FormControl(data.value) }))
    })

    this.disabled ? this.checkboxesGroup.disable() : this.checkboxesGroup.enable()
  }

  ngOnInit() {
  }

  get checkboxesFormArray() {
    return (this.checkboxesGroup.get('checkboxes') as FormArray)
  }

  get checkboxControls() {
    return (this.checkboxesGroup.get('checkboxes') as FormArray).controls as FormGroup[]
  }

  getFormattedFormGroupWithSingleControl(control: FormGroup): { key: string, formControl: FormControl } {
    const keyValue = Object.entries(control.controls).map(([key, value]): { key: string, formControl: FormControl } =>
      ({ key, formControl: value as FormControl }))
    return { key: keyValue[0].key, formControl: keyValue[0].formControl }
  }

  onChange() {
    this.form.ngSubmit.emit()
  }

  onSubmit() {
    this.formEmitter.emit(this.getFormattedSelectedCheckboxes())
  }

  getFormattedSelectedCheckboxes() {
    const resArray: string[] = []
    this.checkboxesFormArray.value.forEach((checkboxData: CheckboxData) => {
      const [[key, value]] = Array.from(Object.entries(checkboxData))
      if (value) {
        resArray.push(key)
      }
    })
    return resArray
  }
}
