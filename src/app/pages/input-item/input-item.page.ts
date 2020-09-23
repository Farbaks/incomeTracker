import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.page.html',
  styleUrls: ['./input-item.page.scss'],
})
export class InputItemPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'name': 'food',
      'UOM': 'Plates',
      'quantity': '5',
      'unit price': 6000
    });
  }

}
