import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/classes/user';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.page.html',
  styleUrls: ['./input-item.page.scss'],
})
export class InputItemPage implements OnInit {
  @Input() action: string;
  @Input() item: Item;
  disabled: boolean;
  constructor(public modalController: ModalController) {
    this.disabled = true;
  }
 
  ngOnInit() {
  }

  onType() {
    if ([this.item.itemName, this.item.UOM].includes("") || [this.item.quantity, this.item.unitPrice,].includes(0) || [this.item.itemName, this.item.UOM, this.item.quantity, this.item.unitPrice].includes(null)) {
      this.disabled = true;
    }
    else {
      this.disabled = false;
    }
  }

  addItem() {
    if(this.action == "Add") {
      this.modalController.dismiss({
        'message': 'Added successfully',
        'body': {
          'itemName': this.item.itemName,
          'UOM': this.item.UOM,
          'quantity': this.item.quantity,
          'unitPrice': this.item.unitPrice,
          'totalPrice': this.item.quantity * this.item.unitPrice
        }
      });
    }
    else {
      this.modalController.dismiss({
        'message': 'Updated successfully',
        'body': {
          'SN':this.item.SN,
          'itemName': this.item.itemName,
          'UOM': this.item.UOM,
          'quantity': this.item.quantity,
          'unitPrice': this.item.unitPrice,
          'totalPrice': this.item.quantity * this.item.unitPrice
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
