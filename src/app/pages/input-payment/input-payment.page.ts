import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Payment } from 'src/app/classes/user';

@Component({
  selector: 'app-input-payment',
  templateUrl: './input-payment.page.html',
  styleUrls: ['./input-payment.page.scss'],
})
export class InputPaymentPage implements OnInit {
  @Input() action: string;
  @Input() type: string;
  @Input() payment: Payment;
  disabled: boolean;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  onType() {
    if ([this.payment.paymentName].includes("") || [this.payment.amount].includes(0) || [this.payment.amount, this.payment.paymentName].includes(null)) {
      this.disabled = true;
    }
    else {
      this.disabled = false;
    }
  }

  addPayment() {
    if(this.action == "Add") {
      this.modalController.dismiss({
        'message': 'Added successfully',
        'body': {
          'paymentName': this.payment.paymentName,
          'paymentType': this.payment.paymentType,
          'amount': this.payment.amount,
        }
      });
    }
    else {
      this.modalController.dismiss({
        'message': 'Updated successfully',
        'body': {
          'SN':this.payment.SN,
          'paymentName': this.payment.paymentName,
          'paymentType': this.payment.paymentType,
          'amount': this.payment.amount,
        }
      });
    }
    
  }
  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

}
