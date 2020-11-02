import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { NewUser } from 'src/app/classes/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  pictureURL: string = "/assets/food/pancakes.jpg";
  userAccount: NewUser;
  currencies: any;
  constructor(
    private router: Router,
    private imagePicker: ImagePicker,
    private usersService: UsersService,
    private globalService: GlobalService,
    private nativeStorage: NativeStorage
  ) {
    this.userAccount = new NewUser;
    this.nativeStorage.getItem('IMEI')
      .then(
        (deviceId) => {
          this.userAccount.deviceId = deviceId;
        },
        error => console.log(error)
      );
    this.getCurrency();
  }

  ngOnInit() {
  }

  getCurrency() {
    this.usersService.register(this.userAccount)
      .subscribe(
        (data) => {
          this.currencies = data;
        },
        (error) => {

        }
      );
  }


  selectPicture() {
    let options = {
      maximumImagesCount: 1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.pictureURL = results[0];
    }, (err) => {
      alert(err);
    });
  }

  signup() {
    this.globalService.showLoader('Creating your account...');
    if (
      [this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress, this.userAccount.currency, this.userAccount.pictureUrl, this.userAccount.password1, this.userAccount.password2].includes("") ||
      [this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress, this.userAccount.currency, this.userAccount.pictureUrl, this.userAccount.password1, this.userAccount.password2].includes(null)
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
    else if (!this.globalService.validatePhone(this.userAccount.phoneNumber)) {
      this.globalService.showToast("Invalid Phone Number", 2000, "error");
      this.globalService.dismissLoader();
    }
    else {
      this.userAccount.password = this.userAccount.password1;
      // Register user
      this.usersService.register(this.userAccount)
        .subscribe(
          (data) => {
            if (data.message == "User account has been created") {
              this.globalService.showToast(data.message, 2000, "success");
              this.globalService.dismissLoader();
              this.nativeStorage.setItem('token', data.apiToken)
                .then(
                  () => {
                    setTimeout(() => {
                      this.router.navigate(['/tabs'], { replaceUrl: true })
                    }, 2000);
                  },
                  error => alert(error)
                )
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
