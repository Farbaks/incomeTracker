import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    IonicModule.forRoot({ _forceStatusbarPadding: true }),
    // IonicModule.forRoot({
    //   mode: 'ios'
    // }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PreviewAnyFile,
    PDFGenerator,
    NativeStorage,
    UniqueDeviceID,
    AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
