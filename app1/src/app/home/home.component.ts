import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'k-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = 'test';

  constructor() { }

  ngOnInit() {
  }

}
