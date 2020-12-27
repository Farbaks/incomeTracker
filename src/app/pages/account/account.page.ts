import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  position: any;
  pictureUrl:any;
  userAccount:any;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private globalService: GlobalService,
  ) {
    this.position = window.pageYOffset;
    this.userAccount = {};
  }

  ngOnInit() {
    // this.fetchUserDetails();
  }
  ionViewDidEnter() {
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
        this.userAccount = userData.data
        this.pictureUrl = userData.data.pictureUrl || "/assets/user.png";
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

  logout() {
    this.usersService.signout()
      .subscribe(
        (data) => {
          if (data.message == "Logout succesful") {
            this.globalService.showToast(data.message, 2000, "success");
            setTimeout(() => {
              localStorage.removeItem('token');
              this.router.navigate(['/signin'], { replaceUrl: true })
            }, 2000);
          }
        },
        (error) => {
          localStorage.removeItem('token');
          setTimeout(() => {
            this.router.navigate(['/signin'], { replaceUrl: true })
          }, 2000);
        })
  }

}
