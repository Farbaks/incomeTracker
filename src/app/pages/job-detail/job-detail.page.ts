import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';
import { EditJobPage } from '../edit-job/edit-job.page';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  id: any;
  jobs: any;
  jobItem: any;
  constructor(
    private routerOutlet: IonRouterOutlet,
    private pdfGenerator: PDFGenerator,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private globalService: GlobalService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    
  ) {
    this.jobItem = {};
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

  }

  ngOnInit() {
    this.fetchDetails();
  }
  ionViewDidEnter() {
    this.ngOnInit();
  }

  fetchDetails() {
    this.jobs = JSON.parse(localStorage.getItem('jobs'));
    this.jobItem = this.jobs.filter(n => n.id == this.id)[0];
    this.reloadDetails();
  }

  reloadDetails() {
    let that = this;
    this.usersService.getOneJob(this.id)
      .subscribe(
        (response) => {
          that.jobItem = response.data;
        },
        (error) => { }
      )

  }

  async moreOptions() {
    let buttons;
    if (this.jobItem.quotation == 'Quotation has not been created') {
      buttons = [{
        text: 'Edit job status',
        handler: () => {
          this.editStatus();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }];
    }
    else {
      buttons = [{
        text: 'View Quotation',
        handler: () => {
          this.viewPDF('quotation');
        }
      }, {
        text: 'View Invoice',
        handler: () => {
          this.viewPDF('invoice');
        }
      }, {
        text: 'Edit job status',
        handler: () => {
          this.editStatus();
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }];
    }
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action-sheet1',
      buttons: buttons
    });
    await actionSheet.present();
  }

  async editJob() {
    const modal = await this.modalController.create({
      component: EditJobPage,
      mode: "ios",
      cssClass: 'ionModal',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'job': this.jobItem,
        'type':'job'
      } 
    });
    modal.onDidDismiss().then(response => {
      if (response.data != undefined && response.data.message == "Updated successfully") {
        // this.reloadDetails();
        this.ngOnInit();
      }
    })
    return await modal.present();
  }

  async editStatus() {
    const modal = await this.modalController.create({
      component: EditJobPage,
      mode: "ios",
      cssClass: 'ionModal3',
      swipeToClose: true,
      componentProps: {
        'job': this.jobItem,
        'type':'status'
      }
      // presentingElement: this.routerOutlet.nativeEl,
    });
    modal.onDidDismiss().then(response => {
      if (response.data != undefined && response.data.message == "Updated successfully") {
        // this.reloadDetails();
        this.ngOnInit();
      }
    })
    return await modal.present();
  }

  viewPDF(type) {
    let url;
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Quotation.pdf'
    }
    if (type == 'quotation') {
      url = this.usersService.domainKey + 'job/' + this.id + '/quotation';
    }
    else {
      url = this.usersService.domainKey + 'job/' + this.id + '/invoice';
    }
    this.pdfGenerator.fromURL(url, options)
      .then(() => 'ok')
      .catch((err) => console.log(err))
  }

}
