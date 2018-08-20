import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styles: []
})
export class ReserverComponent implements OnInit {

  @ViewChild('test') test: any;

  constructor() {
  }

  ngOnInit() {
    this.test.toggle();
  }

}
