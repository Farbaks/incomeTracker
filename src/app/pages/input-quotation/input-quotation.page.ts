import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { InputItemPage } from '../input-item/input-item.page'
import { InputPaymentPage } from '../input-payment/input-payment.page'

@Component({
  selector: 'app-input-quotation',
  templateUrl: './input-quotation.page.html',
  styleUrls: ['./input-quotation.page.scss'],
})
export class InputQuotationPage implements OnInit {
  position: any;
  constructor(public modalController: ModalController, private routerOutlet: IonRouterOutlet) { }

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

  async addItem() {
    const modal = await this.modalController.create({
      component: InputItemPage,
      mode: "ios",
      cssClass: 'ionModal1',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    modal.onDidDismiss().then(response=>{
      console.log(response.data);
    })
    return await modal.present();
  }

  async addPayment(type:string) {
    const modal = await this.modalController.create({
      component: InputPaymentPage,
      componentProps: {
        'type': type,
      },
      mode: "ios",
      cssClass: 'ionModal2',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(response=>{
      console.log(response.data);
    })
    return await modal.present();
  }


}
