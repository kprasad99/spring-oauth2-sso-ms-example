import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = 'test';
  result = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  resource1() {
    this.http.get('/resource1').subscribe(r => console.log(r));
  }

  resource2() {
    this.http.get('/resource2').subscribe(r => console.log(r));
  }

}
