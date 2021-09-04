import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() searchDescriptionMessage: string = ''
  @Output() formEmitter = new EventEmitter<string>()
  public sentMessage: string
  public searchFrom: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.searchFrom = new FormGroup({
      search: new FormControl(''),
    });
  }

  onSubmit() {
    this.sentMessage = this.searchValue
    this.formEmitter.emit(this.searchValue);
  }

  get searchValue() {
    return this.searchFrom.value.search
  }

}
