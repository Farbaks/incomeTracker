import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-input-payment',
  templateUrl: './input-payment.page.html',
  styleUrls: ['./input-payment.page.scss'],
})
export class InputPaymentPage implements OnInit {
  @Input() type: string;
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
