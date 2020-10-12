import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  pictureURL: string = "/assets/food/pancakes.jpg";
  userAccount: any;
  constructor(
    private router: Router,
    private imagePicker: ImagePicker,
    private usersService: UsersService,
    private globalService: GlobalService
  ) {
    this.userAccount = {};
    this.userAccount.name = "";
    this.userAccount.email = "";
    this.userAccount.phoneNumber = "";
    this.userAccount.companyName = "";
    this.userAccount.companyAddress = "";
  }

  ngOnInit() {
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
    this.globalService.showLoader('Creating your account');
    if ([this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress, this.pictureURL].includes("") || [this.userAccount.name, this.userAccount.email, this.userAccount.phone, this.userAccount.companyName, this.userAccount.companyAddress, this.pictureURL].includes(null)) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else {
      let user = {
        name: this.userAccount.name,
        email: this.userAccount.email,
        phoneNumber: this.userAccount.phoneNumber,
        companyName: this.userAccount.companyName,
        companyAddress: this.userAccount.companyAddress,
        pictureUrl: this.pictureURL || "/src/assets/food/shawarma1.jpg"
      }
      this.usersService.signUpUser(user).then(result => {
        this.globalService.dismissLoader();
        let message = "Account has been successfully created.",
          duration = 3000,
          type = 'success';
        this.globalService.showToast(message, duration, type);
        setTimeout(() => {
          this.router.navigateByUrl('/tabs');
        }, 2000);
      }).catch(error => {
        let message = "Account could not be created. Try again later",
          duration = 3000,
          type = 'error';
        this.globalService.showToast(message, duration, type);
        this.globalService.dismissLoader();
      });
    }
  }

}
