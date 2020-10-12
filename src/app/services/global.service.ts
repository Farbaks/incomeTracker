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
    this.isLoading = false;
    // return await this.loadingController.dismiss();
  }

  async showToast(text, duration, type) {
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
      mode: 'ios'
    });
    this.toast.present();
  }
}
