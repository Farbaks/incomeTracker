import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading: any;
  toast: any;
  isLoading: boolean;
  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
    this.isLoading = false;
  }

  async showLoader(text) {
    this.isLoading = true;
    this.loading = await this.loadingController.create({
      cssClass: 'loader-class',
      message: text || 'Loading...',
      mode: 'ios'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoader() {
    try {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    catch (e) {
      this.isLoading = false;
    }

  }

  async showToast(text, duration, type, position?) {
    let toastType;
    if (type == 'error') {
      toastType = 'error-toast';
    }
    else {
      toastType = 'success-toast';
    }
    this.toast = await this.toastController.create({
      message: text,
      duration: duration || 0,
      cssClass: toastType,
      mode: 'ios',
      position: position || "bottom"
    });
    this.toast.present();
  }

  validateEmail(response: any) {
    var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (response.match(email)) {
      return true;
    } else {
      return false;
    }
  }

  validatePhone(phone:any) {
    var phoneno = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
    return phone.match(phoneno) ? true : false;
  }

  nairaFormat(currency, amount) {
    try {
      if (amount % 1 == 0) {
        return currency + (amount).toLocaleString() + ".00";
      }
      return currency + (amount).toLocaleString();
    }
    catch (error) {
      return currency + (0).toLocaleString() + ".00";
    }
  }

  changeDate(date) {
    var from = date.split("T");
    var f = new Date(from[2], from[1] - 1, from[0]);
    return f;
  }

  formatDate(date) {
    var d = new Date(date);
    let formatted_date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return formatted_date;
  }
}
