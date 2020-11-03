import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewJob } from 'src/app/classes/user';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.page.html',
  styleUrls: ['./new-job.page.scss'],
})
export class NewJobPage implements OnInit {
  data: NewJob;
  constructor(
    public modalController: ModalController,
    private router: Router,
    private usersService: UsersService,
    private globalService: GlobalService,
  ) {
    this.data = new NewJob;
  }

  ngOnInit() {
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'name': 'food',
      'UOM': 'Plates',
      'quantity': '5',
      'unit price': 6000
    });
  }

  createJob() {
    this.globalService.showLoader('Creating Job...');
    if ([this.data.companyName, this.data.contactName, this.data.contactNumber].includes("")) {
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
      this.usersService.createNewJob(this.data)
        .subscribe(
          (data) => {
            if (data.message == "Job has been created successfully") {
              this.globalService.showToast(data.message, 2000, "success");
              this.globalService.dismissLoader();
              localStorage.setItem('token', data.apiToken);
              setTimeout(() => {
                this.closeModal();
                this.router.navigate([data.data.id])
              }, 2000);
            }
          },
          (error) => {
            if (error.message == "Email account does not exist") {
              this.globalService.showToast(error.message, 2000, "error");
              this.globalService.dismissLoader();
            }
            else if (error.message == "Email or password incorrect") {
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

}
