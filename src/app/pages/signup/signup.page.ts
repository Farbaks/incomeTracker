import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { NewUser } from 'src/app/classes/user';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton;
  pictureURL: any = "/assets/user.png";
  userAccount: NewUser;
  currencies: any;
  imageURL: any ;
  constructor(
    private router: Router,
    private usersService: UsersService,
    public globalService: GlobalService,
    private uniqueDeviceID: UniqueDeviceID,
  ) {
    localStorage.removeItem("token");
    this.userAccount = new NewUser;
    this.getCurrency();
  }

  ngOnInit() {
  }

  // log() {
  //   console.log(this.userAccount.currency);
  // }

  getCurrency() {
    this.usersService.fetchCurrency()
      .subscribe(
        (data) => {
          this.currencies = data;
        },
        (error) => {

        }
      );
  }


  uploadFile() {
    this.fileButton.nativeElement.click();
  }
  fileChanged(event) {
    this.userAccount.pictureUrl = event.target.files[0];
    const files = event.target.files[0];
    console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      this.pictureURL = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  signup() {
    this.globalService.showLoader('Creating your account...');
    if (
      [this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress, this.userAccount.currency, this.userAccount.password1, this.userAccount.password2].includes("") ||
      [this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress, this.userAccount.currency, this.userAccount.password1, this.userAccount.password2].includes(null)
    ) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else if (this.userAccount.password1 != this.userAccount.password2) {
      this.globalService.showToast("Passwords do not match", 2000, "error");
      this.globalService.dismissLoader();
    }
    else if (!this.globalService.validateEmail(this.userAccount.email)) {
      this.globalService.showToast("Invalid Email", 2000, "error");
      this.globalService.dismissLoader();
    }
    // else if (!this.globalService.validatePhone(this.userAccount.phoneNumber)) {
    //   this.globalService.showToast("Invalid Phone Number", 2000, "error");
    //   this.globalService.dismissLoader();
    // }
    else {
      this.userAccount.password = this.userAccount.password1;
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
      // Register user
      this.usersService.register(this.userAccount)
        .subscribe(
          (data) => {
            if (data.message == "User account has been created") {
              this.globalService.showToast(data.message, 2000, "success");
              this.globalService.dismissLoader();
              localStorage.setItem('token', data.apiToken);
              setTimeout(() => {
                this.router.navigate(['/tabs'], { replaceUrl: true })
              }, 2000);
            }
          },
          (error) => {
            if (error.message == "Email account already exists") {
              this.globalService.showToast(error.message, 2000, "error");
              this.globalService.dismissLoader();
            }
            else if (error.message == "Phone number already exists") {
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
