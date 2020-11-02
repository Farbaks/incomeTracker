import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  position: any;
  pictureURL: string = "/assets/food/pancakes.jpg";
  userAccount: any ={};
  constructor(
    private imagePicker: ImagePicker,
    private usersService: UsersService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
    this.fetchUserDetails();
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

  fetchUserDetails() {
  }

  updateUser() {
    this.globalService.showLoader('Updating your account');
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
    }
  }

}
