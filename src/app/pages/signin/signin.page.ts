import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/classes/user';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  
  userAccount: User;
  constructor(
    private router: Router,
    private usersService: UsersService,
    public globalService: GlobalService,
    private uniqueDeviceID: UniqueDeviceID,
  ) {
    localStorage.removeItem("token");
    this.userAccount = new User;    
  }

  ngOnInit() {
  }

  signin() {
    var that = this;
    this.globalService.showLoader('Signing in...');
    if ([this.userAccount.email, this.userAccount.password].includes("") || [this.userAccount.email, this.userAccount.password].includes(null)) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else if (!this.globalService.validateEmail(this.userAccount.email)) {
      this.globalService.showToast("Invalid Email", 2000, "error");
      this.globalService.dismissLoader();
    }
    else {
      try {
        this.userAccount.deviceId = localStorage.getItem('IMEI');
      }
      catch (error) {
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
          this.userAccount.deviceId = uuid;
        })
        .catch((error: any) => {
          this.userAccount.deviceId = '0000-0000-0000-0000'
        });
      }
      // Signin user
      this.usersService.signin(this.userAccount)
        .subscribe(
          (data) => {
            if (data.message == "Login succesful") {
              this.globalService.showToast(data.message, 2000, "success");
              this.globalService.dismissLoader();
              localStorage.setItem('token', data.apiToken);
              setTimeout(() => {
                this.router.navigate(['/tabs'], { replaceUrl: true })
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
