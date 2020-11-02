import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { NewJobPage } from '../new-job/new-job.page';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  position: any;
  constructor(public modalController: ModalController, private routerOutlet: IonRouterOutlet) {
    this.position = window.pageYOffset;
  }

  ngOnInit() {
  }

  async newJobModal() {
    const modal = await this.modalController.create({
      component: NewJobPage,
      mode: "ios",
      cssClass: 'ionModal',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(response=>{
      console.log(response.data);
    })
    return await modal.present();
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
    // console.dir('red');
  }

}
