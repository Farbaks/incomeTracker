import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  position: any;

  constructor() { }

  ngOnInit() {
  }

  logScrolling(event) {
    var scroll = event.detail.scrollTop;
    if (scroll > 80) {
      document.getElementById('header').style.borderBottom = "solid 1px rgb(230,230,230)";
    }
    else {
      document.getElementById('header').style.borderBottom = "none";
    }
    this.position = scroll;
  }

}
