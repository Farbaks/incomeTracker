import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { UpdateUser } from 'src/app/classes/user';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton;
  position: any;
  pictureUrl: any;
  userAccount: UpdateUser;
  constructor(
    private usersService: UsersService,
    private globalService: GlobalService,
    private router: Router,
    private camera: Camera
  ) {
    this.userAccount = new UpdateUser;
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


  fetchUserDetails() {
    this.usersService.getUserInfo().subscribe(
      (userData) => {
        this.userAccount = userData.data;
        this.pictureUrl = this.userAccount.pictureUrl || "/assets/user.png";
      },
      (error) => {
        if (error.message == "No token sent in request" || error.message == "Invalid token" || error.message == "Not authorized to carry out this action") {
          this.router.navigate(['/signin'], { replaceUrl: true })
        }
        else {
          this.router.navigate(['/signin'], { replaceUrl: true })
        }
      }
    );
  }

  choosePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.pictureUrl = base64Image;
      this.updatePicture(base64Image)
      // imageData is either a base64 encoded string or a file URI
    }, (err) => {
      // Handle error
    });
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }
  fileChanged(event) {
    this.userAccount.pictureUrl = event.target.files[0];
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.pictureUrl = reader.result;
      this.updatePicture(this.pictureUrl);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  updatePicture(picture) {
    this.globalService.showLoader('Updating logo...');
    this.usersService.updatePicture(JSON.stringify({logo: picture})).subscribe(
      (data) => {
        this.globalService.showToast(data.message, 2000, "success");
          this.globalService.dismissLoader();
          this.fetchUserDetails();
      },
      (error) => {
        this.globalService.showToast(error.message, 2000, "error");
        this.globalService.dismissLoader();
      }
    );
  }

  removePicture() {
    this.globalService.showLoader('Removing logo...');
    this.usersService.removePicture().subscribe(
      (data) => {
        this.globalService.showToast(data.message, 2000, "success");
          this.globalService.dismissLoader();
          this.fetchUserDetails();
      },
      (error) => {
        this.globalService.showToast(error.message, 2000, "error");
        this.globalService.dismissLoader();
      }
    );
  }

  updateUser() {
    this.globalService.showLoader('Updating your account...');
    if ([this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress].includes("") || [this.userAccount.name, this.userAccount.email, this.userAccount.phoneNumber, this.userAccount.companyName, this.userAccount.companyAddress].includes(null)) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else {
      this.usersService.updateUser(this.userAccount).subscribe(
        (data) => {
          if (data.message == "User account has been updated") {
            this.globalService.showToast(data.message, 2000, "success");
            this.globalService.dismissLoader();
          }
        },
        (error) => {
          this.globalService.showToast(error.message, 2000, "error");
          this.globalService.dismissLoader();
        }
      );
    }
  }

}
