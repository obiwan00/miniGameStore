import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title$?: Observable<any>;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.title$ = this.http.get('/api/test').pipe(delay(1000))
  }
}
