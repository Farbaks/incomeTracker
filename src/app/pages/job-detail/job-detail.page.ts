import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
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
    private browserTab: BrowserTab,
    private route: ActivatedRoute,
    private usersService: UsersService,
    public globalService: GlobalService,
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
    this.fetchDetails();
  }

  fetchDetails() {
    try {
      this.jobs = JSON.parse(localStorage.getItem('jobs'));
      this.jobItem = this.jobs.filter(n => n.id == this.id)[0];
    }
    catch (error) { }

    let that = this;
    this.usersService.getOneJob(this.id)
      .subscribe(
        (response) => {
          that.jobItem = response.data;
        },
        (error) => { }
      )
    this.reloadDetails();
  }

  reloadDetails() {
    this.usersService.getUserJobs(0, 20).subscribe(
      (jobData) => {
        localStorage.setItem('jobs', JSON.stringify(jobData.data));
      },
      (error) => {

      }
    );

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
        'type': 'job'
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
        'type': 'status'
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
    let options;
    if (type == 'quotation') {
      url = this.usersService.d + 'job/' + this.id + '/quotation';
      options = {
        documentSize: 'A4',
        type: 'share',
        fileName: 'Quotation.pdf'
      }
    }
    else {
      url = this.usersService.d + 'job/' + this.id + '/invoice';
      options = {
        documentSize: 'A4',
        type: 'share',
        fileName: 'Quotation.pdf'
      }
    }
    // this.pdfGenerator.fromURL(url, options)
    //   .then(() => 'ok')
    //   .catch((err) => console.log(err));
    this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        } else {
          // open URL with InAppBrowser instead or SafariViewController
        }
      });
  }
}

