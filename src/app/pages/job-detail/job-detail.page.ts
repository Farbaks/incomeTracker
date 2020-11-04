import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';
import { EditJobPage } from '../edit-job/edit-job.page';
import { ActionSheetController } from '@ionic/angular';
import { from } from 'rxjs';

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
    private pdfGenerator: PDFGenerator,
    private previewAnyFile: PreviewAnyFile,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private globalService: GlobalService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {
    this.jobItem = {};
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.fetchDetails();
  }

  ngOnInit() {
  }

  fetchDetails() {
    this.jobs = JSON.parse(localStorage.getItem('jobs'));
    this.jobItem = this.jobs.filter(n => n.id == this.id)[0];
    this.reloadDetails();
  }

  reloadDetails() {
    this.usersService.getOneJob(this.id)
      .subscribe(
        (response) => {
          this.jobItem = {};
          this.jobItem = response.data;
          console.log(this.jobItem);
        },
        (error) => { }
      )

  }

  async moreOptions() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Edit job status',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          this.editStatus();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async editStatus() {
    const modal = await this.modalController.create({
      component: EditJobPage,
      mode: "ios",
      cssClass: 'ionModal3',
      swipeToClose: true,
      componentProps: {
        'status': this.jobItem.status,
        'jobId': this.jobItem.id,
      }
      // presentingElement: this.routerOutlet.nativeEl,
    });
    modal.onDidDismiss().then(response => {
      if (response.data != undefined && response.data.message == "Updated successfully") {
        this.reloadDetails();
      }
    })
    return await modal.present();
  }

  viewPDF() {
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Quotation.pdf'
    }

    this.pdfGenerator.fromURL('https://github.com/farbaks', options)
      .then(() => 'ok')
      .catch((err) => console.log(err))
    // this.previewAnyFile.preview('http://127.0.0.1:8000/quotation')
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));
  }

}
