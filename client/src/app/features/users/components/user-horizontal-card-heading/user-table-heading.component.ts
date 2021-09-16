import { Component, OnInit, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'user-table-heading',
  templateUrl: './user-table-heading.component.html',
  styleUrls: ['./user-table-heading.component.scss']
})
export class UserTableHeading implements OnInit {
  @ViewChild('template') template: any

  constructor(
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.template)
    this.viewContainerRef.createEmbeddedView(this.template);
  }

}
