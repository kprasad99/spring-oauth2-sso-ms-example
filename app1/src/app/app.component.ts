import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app1';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  onResource2() {
    this.http.get('/resource2').subscribe(e => {
      console.log(e);
    });
  }

}
