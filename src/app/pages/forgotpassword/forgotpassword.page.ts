import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  userAccount: User;
  constructor(
    private usersService: UsersService,
    private globalService: GlobalService,
  ) {
    this.userAccount = new User;
  }

  ngOnInit() {
  }

  forgotpassword() {
    this.globalService.showLoader('Sending reset mail...');
    if ([this.userAccount.email].includes("") || [this.userAccount.email].includes(null)) {
      let message = "Please enter your mail and try again.",
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
      // send reset mail
      this.usersService.forgotpassword(this.userAccount).subscribe(
        (data) => {
          console.log(data.status);
          if (data.message == "Password reset mail has been sent") {
            this.globalService.showToast(data.message, 2000, "success");
            this.globalService.dismissLoader();
          }
        },
        (error) => {
          if (error.message == "Email does not exist") {
            this.globalService.showToast(error.message, 2000, "error");
            this.globalService.dismissLoader();
          }
          else {
            this.globalService.showToast("An error occured. Please try again later", 2000, "error");
            this.globalService.dismissLoader();
          }
        }
      );
    }
  }

}
