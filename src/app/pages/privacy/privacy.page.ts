import { Component, OnInit } from '@angular/core';
import { UpdatePassword } from 'src/app/classes/user';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  position: any;
  data: UpdatePassword;
  constructor(
    private usersService: UsersService,
    public globalService: GlobalService,
  ) {
    this.data = new UpdatePassword;
  }

  ngOnInit() {
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

  updatePassword() {
    this.globalService.showLoader('Updating your password');
    if ([this.data.oldPassword, this.data.newPassword, this.data.newPassword2].includes("")) {
      let message = "Please fill all fields and try again.",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else if (this.data.newPassword != this.data.newPassword2) {
      let message = "Your passwords don't match",
        duration = 3000,
        type = 'error';
      this.globalService.dismissLoader();
      this.globalService.showToast(message, duration, type);
    }
    else {
      this.usersService.updatePassword(this.data).subscribe(
        (data) => {
          this.globalService.showToast(data.message, 2000, "success");
          this.globalService.dismissLoader();
        },
        (error) => {
          this.globalService.showToast(error.message, 2000, "error");
          this.globalService.dismissLoader();
        }
      );
    }
  }

}
