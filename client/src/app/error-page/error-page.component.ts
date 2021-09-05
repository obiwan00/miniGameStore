import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  public title: string = '404'
  public description: string = 'Page not found'

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data
    this.title = data.title ? data.title : this.title
    this.description = data.description ? data.description : this.description
  }

}
