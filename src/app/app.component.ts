import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private uniqueDeviceID: UniqueDeviceID,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();

      this.splashScreen.hide();

      this.getImei();
    });
  }
  async getImei() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        localStorage.setItem('IMEI', uuid);
        console.log(uuid);
      })
      .catch((error: any) => {
        console.log(error);
        localStorage.setItem('IMEI', '0000-0000-0000-0000');
      });
  }

}
