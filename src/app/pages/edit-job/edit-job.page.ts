import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {
  @Input() status: string;
  @Input() jobId: number;
  constructor(public modalController: ModalController,
    private usersService: UsersService,
    private globalService: GlobalService,) { }

  ngOnInit() {
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
      status: this.status,
      jobId: this.jobId
    }
    this.usersService.editJob(data)
      .subscribe(
        (data) => {
          if (data.message == "Job has been updated successfully") {
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
          else {
            this.globalService.showToast("An error occured. Please try again later.", 2000, "error");
            this.globalService.dismissLoader();
          }
        },
        (error) => {
          this.globalService.showToast("An error occured. Please try again later.", 2000, "error");
          this.globalService.dismissLoader();
        }
      )

  }

}
