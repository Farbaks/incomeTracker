import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController, IonList } from '@ionic/angular';
import { InputItemPage } from '../input-item/input-item.page'
import { InputPaymentPage } from '../input-payment/input-payment.page'
import { Quotation, Item, Payment } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-input-quotation',
  templateUrl: './input-quotation.page.html',
  styleUrls: ['./input-quotation.page.scss'],
})
export class InputQuotationPage implements OnInit {
  @ViewChild(IonList) list: IonList;
  position: any;
  type: string;
  jobId: number;
  quote: Quotation;
  Items: Item[];
  Payments: Payment[];
  currency: string;
  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private usersService: UsersService,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.jobId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.quote = new Quotation(this.jobId);
    this.type = this.route.snapshot.paramMap.get("type");
    this.currency = JSON.parse(localStorage.getItem('jobs')).filter(n => n.id == this.jobId)[0].currency;

    if (this.type == 'edit') {
      let jobs = JSON.parse(localStorage.getItem('jobs'));
      this.quote = jobs.filter(n => n.id == this.jobId)[0].quotation.quotationDetails;
      this.quote.items = jobs.filter(n => n.id == this.jobId)[0].quotation.items.itemList;
      this.quote.payments = jobs.filter(n => n.id == this.jobId)[0].quotation.tax.taxList;
      this.quote.payments.push(...jobs.filter(n => n.id == this.jobId)[0].quotation.discount.discountList)
    }
    let index = 1;
    this.quote.items.forEach(item => {
      item.SN = index;
      index += 1;
    });
    index = 1;
    this.quote.payments.forEach(payment => {
      payment.SN = index;
      index += 1;
    });
    this.Items = this.quote.items || [];
    this.Payments = this.quote.payments || [];
    this.calculateTotal();
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
      quantity: 0,
      unitPrice: 0
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
    if (this.quote.subTotalJobCost > 0) {
      let payment = {
        paymentName: "",
        paymentType: type,
        amount: 0
      };
      this.addPayment("Add", type, payment);
    }
    else {
      this.globalService.showToast(`You have to add an item before adding ${type}`, 2000, 'error', 'top');
    }
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

  async addItem(action: string, item?: Item,) {
    const modal = await this.modalController.create({
      component: InputItemPage,
      mode: "ios",
      cssClass: 'ionModal1',
      swipeToClose: true,
      componentProps: {
        'action': action,
        'item': item,
      }
      // presentingElement: this.routerOutlet.nativeEl,
    });
    modal.onDidDismiss().then(response => {
      if (response.data != undefined && response.data.message == "Updated successfully") {
        this.Items.forEach(element => {
          if (element.SN == response.data.body.SN) {
            element.UOM = response.data.body.UOM;
            element.itemName = response.data.body.itemName;
            element.quantity = response.data.body.quantity;
            element.totalPrice = response.data.body.totalPrice;
            element.unitPrice = response.data.body.unitPrice;
          }
        })
      }
      else if (response.data != undefined && response.data.message == "Added successfully") {
        let newItem = response.data.body;
        newItem.SN = this.Items.length;
        this.Items.push(newItem);
      }
      this.calculateTotal();
    })
    return await modal.present();
  }

  async addPayment(action: string, type: string, payment?: Payment) {
    const modal = await this.modalController.create({
      component: InputPaymentPage,
      componentProps: {
        'action': action,
        'type': type,
        'payment': payment,
      },
      mode: "ios",
      cssClass: 'ionModal2',
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(response => {
      if (response.data != undefined && response.data.message == "Updated successfully") {
        this.Payments.forEach(element => {
          if (element.SN == response.data.body.SN) {
            element.amount = response.data.body.amount;
            element.paymentName = response.data.body.paymentName;
            element.paymentType = response.data.body.paymentType;
          }
        });
      }
      else if (response.data != undefined && response.data.message == "Added successfully") {
        let newPayment = response.data.body;
        newPayment.SN = this.Payments.length;
        this.Payments.push(newPayment);
      }
      this.calculateTotal();
    })
    return await modal.present();
  }

  calculateTotal() {
    this.quote.subTotalJobCost = 0;
    this.Items.forEach(element => {
      this.quote.subTotalJobCost += element.totalPrice;
    });
    this.quote.totalJobCost = this.quote.subTotalJobCost;
    this.Payments.forEach(element => {
      if (element.paymentType == 'tax') {
        this.quote.totalJobCost += element.amount;
      }
      else if (element.paymentType == 'discount') {
        this.quote.totalJobCost -= element.amount;
      }
    });
  }

  submit(type) {
    this.quote.items = this.Items;
    this.quote.payments = this.Payments;
    if ([this.quote.salesPerson, this.quote.paymentTerms].includes("") ||
      [this.quote.quotationValidity, this.quote.profit].includes(0) ||
      this.quote.items.length == 0
    ) {
      this.globalService.showToast(`Please fill in the required fields before submitting`, 2000, 'error', 'top');
    }
    else if(this.quote.profit > this.quote.totalJobCost) {
      this.globalService.showToast(`Your profit cannot be greater than the cost of the job`, 2000, 'error', 'top');
    }
    else {
      if (type == "new") {
        this.globalService.showLoader("Creating Quotation...");
        this.usersService.createNewQuotation(this.quote)
          .subscribe(
            (data) => {
              if (data.message == "Quotation has been created successfully") {
                this.globalService.showToast(data.message, 2000, "success");
                this.globalService.dismissLoader();
                setTimeout(() => {
                  this.router.navigate(['/tabs/jobs/' + this.jobId]);
                }, 2000);
              }
            },
            (error) => {
              if (error.message == "Job does not exist") {
                this.globalService.showToast(error.message, 2000, "error");
                this.globalService.dismissLoader();
              }
              else if (error.message == "All fields are required") {
                this.globalService.showToast(error.message, 2000, "error");
                this.globalService.dismissLoader();
              }
              else {
                this.globalService.showToast("An error occured. Please try again later", 2000, "error");
                this.globalService.dismissLoader();
              }
            })
      }
      else {
        this.globalService.showLoader("Updating Quotation...");
        this.usersService.editQuotation(this.quote)
          .subscribe(
            (data) => {
              if (data.message == "Quotation has been updated successfully") {
                this.globalService.showToast(data.message, 2000, "success");
                this.globalService.dismissLoader();
                setTimeout(() => {
                  this.router.navigate(['/tabs/jobs/' + this.jobId]);
                }, 2000);
              }
            },
            (error) => {
              if (error.message == "Job does not exist") {
                this.globalService.showToast(error.message, 2000, "error");
                this.globalService.dismissLoader();
              }
              else if (error.message == "All fields are required") {
                this.globalService.showToast(error.message, 2000, "error");
                this.globalService.dismissLoader();
              }
              else {
                this.globalService.showToast("An error occured. Please try again later", 2000, "error");
                this.globalService.dismissLoader();
              }
            })
      }

    }
  }

}
