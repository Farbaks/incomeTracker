import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController, IonList  } from '@ionic/angular';
import { InputItemPage } from '../input-item/input-item.page'
import { InputPaymentPage } from '../input-payment/input-payment.page'
import { Quotation, Item, Payment } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-input-quotation',
  templateUrl: './input-quotation.page.html',
  styleUrls: ['./input-quotation.page.scss'],
})
export class InputQuotationPage implements OnInit {
  @ViewChild(IonList) list: IonList;
  position: any;
  quote:Quotation;
  Items: Item[];
  Payments: Payment[];
  constructor(
    public modalController: ModalController, 
    private routerOutlet: IonRouterOutlet,
    private usersService: UsersService,
    private globalService: GlobalService,) {
    this.quote = new Quotation;
    this.Items = [];
    this.Payments = [];
  }

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

  openAddItemModal() {
    let item = {
      itemName: "",
      UOM: "",
      quantity:0,
      unitPrice:0
    };
    this.addItem("Add", item);
  }

  openEditItemModal(item) {
    this.addItem("Edit", item);
  }
  removeItem(item) {
    this.Items = this.Items.filter(element => {
      return element.SN != item.SN
    });
  }

  openAddPaymentModal(type) {
    let payment = {
      paymentName: "",
      paymentType: type,
      amount:0
    };
    this.addPayment("Add", type, payment);
  }

  openEditPaymentModal(payment) {
    this.list.closeSlidingItems();
    this.addPayment("Edit", payment.paymentType, payment);
  }
  removePayment(payment) {
    this.Payments = this.Payments.filter(element => {
      return element.SN != payment.SN
    });
  }

  async addItem(action:string, item?:Item,) {
    const modal = await this.modalController.create({
      component: InputItemPage,
      mode: "ios",
      cssClass: 'ionModal1',
      swipeToClose: true,
      componentProps: {
        'action':action,
        'item': item,
      }
      // presentingElement: this.routerOutlet.nativeEl,
    });
    modal.onDidDismiss().then(response=>{
      console.log(response.data);
      if (response.data != undefined && response.data.message == "Updated successfully") {
        this.Items.forEach(element => {
          if(element.SN == response.data.body.SN) {
            element.UOM = response.data.body.UOM;
            element.itemName = response.data.body.itemName;
            element.quantity = response.data.body.quantity;
            element.totalPrice = response.data.body.totalPrice;
            element.unitPrice = response.data.body.unitPrice;
          }
        })
      }
      else if(response.data != undefined && response.data.message == "Added successfully") {
        let newItem = response.data.body;
        newItem.SN = this.Items.length;
        this.Items.push(newItem);
      }
      
    })
    return await modal.present();
  }

  async addPayment(action:string, type:string, payment?:Payment) {
    const modal = await this.modalController.create({
      component: InputPaymentPage,
      componentProps: {
        'action':action,
        'type': type,
        'payment': payment,
      },
      mode: "ios",
      cssClass: 'ionModal2',
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(response=>{
      console.log(response.data);
      if (response.data != undefined && response.data.message == "Updated successfully") {
        this.Payments.forEach(element => {
          if(element.SN == response.data.body.SN) {
            element.amount = response.data.body.amount;
            element.paymentName = response.data.body.paymentName;
            element.paymentType = response.data.body.paymentType;
          }
        });
      }
      else if(response.data != undefined && response.data.message == "Added successfully") {
        let newPayment = response.data.body;
        newPayment.SN = this.Payments.length;
        this.Payments.push(newPayment);
      }
    })
    return await modal.present();
  }


}
