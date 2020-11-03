import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/classes/user';

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
    private globalService: GlobalService,
    private nativeStorage: NativeStorage
  ) {
    localStorage.removeItem("token");
    this.userAccount = new User;
    this.userAccount.deviceId = localStorage.getItem('IMEI');
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
