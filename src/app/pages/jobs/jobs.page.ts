import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';
import { NewJobPage } from '../new-job/new-job.page';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  position: any;
  jobs: [];
  offset:number;
  limit:number;
  loading:boolean =true;
  constructor(public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private usersService: UsersService,
    public globalService: GlobalService,
  ) {
    this.position = window.pageYOffset;
    this.jobs = [];
    this.offset = 0;
    this.limit = 20;
  }

  ngOnInit() {
    // this.getjobs(this.offset, this.limit);
  }
  ionViewDidEnter() {
    this.getjobs(this.offset, this.limit);
  }

  async newJobModal() {
    const modal = await this.modalController.create({
      component: NewJobPage,
      mode: "ios",
      cssClass: 'ionModal',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(response => {
      this.getjobs(this.offset, this.limit);
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

  doRefresh(event) {
    this.offset = 0;
    this.limit = 20;
    this.getjobs(this.offset, this.limit);
    event.target.complete();
  }

  more(event) {
    this.limit += 20;
    this.getjobs(this.offset, this.limit);
    event.target.complete();
    if (this.jobs.length <= this.limit) {
      event.target.disabled = true;
    }
  }

  getjobs(offset, limit) {
    if(this.jobs.length == 0) {
      this.loading = true;
    }
    this.usersService.getUserJobs(offset, limit).subscribe(
      (jobData) => {
        this.jobs = jobData.data;
        localStorage.setItem('jobs', JSON.stringify(this.jobs));
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

}
