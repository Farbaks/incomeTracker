import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NewJob } from 'src/app/classes/user';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {
  @Input() type: string;
  @Input() job: any;
  data: NewJob;
  constructor(public modalController: ModalController,
    private usersService: UsersService,
    public globalService: GlobalService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data = new NewJob;
    this.data = this.job;
  }
  getData() {

  }

  closeModal(message?) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if (message) {
      this.modalController.dismiss({
        'message': message
      });
    }
    else {
      this.modalController.dismiss();
    }

  }

  changeStatus() {
    this.globalService.showLoader('Updating Status...');
    let data = {
      status: this.job.status,
      jobId: this.job.id
    }
    this.usersService.editJobStatus(data)
      .subscribe(
        (data) => {
          if (data.message == "Job status has been updated successfully") {
            this.globalService.showToast(data.message, 2000, "success");
            this.globalService.dismissLoader();
            this.usersService.getUserJobs(0, 20).subscribe(
              (jobData) => {
                localStorage.setItem('jobs', JSON.stringify(jobData.data));
                this.closeModal('Updated successfully');
              },
              (error) => {

              }
            );
          }
        },
        (error) => {
          this.globalService.showToast("An error occured. Please try again later.", 2000, "error");
          this.globalService.dismissLoader();
        }
      )

  }

  editJob() {
    this.globalService.showLoader('Updating job details...');
    if ([this.data.jobName, this.data.companyName, this.data.companyAddress, this.data.contactName, this.data.contactNumber].includes("")) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else if (!this.globalService.validatePhone(this.data.contactNumber)) {
      this.globalService.showToast("Invalid Phone number", 2000, "error");
      this.globalService.dismissLoader();
    }
    else {
      this.usersService.editJob(this.data)
        .subscribe(
          (data) => {
            this.globalService.showToast(data.message, 2000, "success");
            this.globalService.dismissLoader();
            this.usersService.getUserJobs(0, 20).subscribe(
              (jobData) => {
                localStorage.setItem('jobs', JSON.stringify(jobData.data));
                this.closeModal('Updated successfully');
              },
              (error) => {

              }
            );
          },
          (error) => {
            if (error.message == "Job does not exist") {
              this.globalService.showToast(error.message, 2000, "error");
              this.globalService.dismissLoader();
            }
            else {
              this.globalService.showToast("An error occured. Please try again later", 2000, "error");
              this.globalService.dismissLoader();
            }
          })
    }
  }

  async deleteJobConfirm() {
    const alert = await this.alertController.create({
      header: 'Delete Job',
      message: 'Are you sure you want to delete this job? This action is irreversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          cssClass: 'danger-text',
          handler: () => {
            this.deleteJob();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteJob() {
    this.globalService.showLoader('Deleting Job...');
    this.usersService.deleteJob(this.data.id)
      .subscribe(
        (data) => {
          if (data.message == "Job has been deleted successfully") {
            this.globalService.showToast(data.message, 2000, "success");
            this.globalService.dismissLoader();
            setTimeout(() => {
              this.closeModal();
              this.router.navigate(['/tabs/jobs']);
            }, 2000);
          }
        },
        (error) => {
          if (error.message == "Job does not exist") {
            this.globalService.showToast(error.message, 2000, "error");
            this.globalService.dismissLoader();
          }
          else {
            this.globalService.showToast("An error occured. Please try again later", 2000, "error");
            this.globalService.dismissLoader();
          }
        })
  }

}
