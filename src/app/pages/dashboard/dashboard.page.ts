import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('myChart') myChart;
  @ViewChild('myChart2') myChart2;
  chart: any;
  chart2: any;
  colorArray: any;
  position: any;
  pictureUrl: any;
  jobs: [];
  userAccount: any;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private globalService: GlobalService,
    private navController: NavController
  ) {
    this.position = window.pageYOffset;
    this.jobs = [];
    this.userAccount = {};
    this.pictureUrl = "/assets/user.png";
  }

  ngOnInit() {
    this.loadUserInfo();
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

  doRefresh(event) {
    this.loadUserInfo();
    event.target.complete();
  }

  loadUserInfo() {
    this.usersService.getUserInfo().subscribe(
      (userData) => {
        this.userAccount = userData.data;
        this.usersService.getUserReport().subscribe(
          (response) => {
            this.userAccount.totalIncome = this.globalService.nairaFormat(response.data.currency, response.data.totalIncome);
            this.userAccount.monthIncome = this.globalService.nairaFormat(response.data.currency, response.data.report[0].income) || this.globalService.nairaFormat(response.data.currency, 0);
            let labels = [];
            let incomes = [];
            if (response.data.report.length > 0) {
              response.data.report.forEach(element => {
                labels.push(element.month + ", " + element.year);
                incomes.push(element.income);
              });
            }
            else {
              labels = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              incomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            let chartData = {
              chart1: {
                labels: labels,
                incomes: incomes
              },
              chart2: {
                data: [userData.data.completedJobs, userData.data.pendingJobs, userData.data.canceledJobs,]
              }
            }
            this.loadChart(chartData);
            this.usersService.getUserJobs(0, 5).subscribe(
              (jobData) => {
                this.jobs = jobData.data;
              },
              (error) => {
                if (error.message == "No token sent in request" || error.message == "Invalid token" || error.message == "Not authorized to carry out this action") {
                  this.router.navigate(['/signin'], { replaceUrl: true })
                }
              }
            );
          },
          (error) => {
            if (error.message == "No token sent in request" || error.message == "Invalid token" || error.message == "Not authorized to carry out this action") {
              this.router.navigate(['/signin'], { replaceUrl: true })
            }
          }
        );
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

  loadChart(data) {
    // Line chart
    let ctx = this.myChart.nativeElement;
    ctx.fillStyle = "red";
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.chart1.labels,
        datasets: [{
          label: 'Income',
          data: data.chart1.data,
          backgroundColor: 'rgba(241, 43, 126, .1)',
          borderColor: 'rgb(241, 43, 126)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(241, 43, 126)',
          pointRadius: 4
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return " ";
              }
            },
            gridLines: {
              borderDash: [3],
              lineWidth: 1.5,
              drawBorder: false,
            },

          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }]
        },
        legend: {
          position: 'bottom',
          align: 'end',
          labels: {
            boxWidth: 10,
            usePointStyle: true,
          },

        }
      }
    });

    // Donut chart
    let ctx2 = this.myChart2.nativeElement;
    ctx.fillStyle = "red";
    this.chart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Completed Jobs', 'Pending Jobs', 'Canceled'],
        datasets: [{
          label: 'Income',
          data: data.chart1.data,
          backgroundColor: ['#4BB543', 'orange', 'red'],
          borderColor: ['#4BB543', 'orange', 'red'],
          borderWidth: 2,
          pointBackgroundColor: ['#4BB543', 'orange', 'red'],
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        cutoutPercentage: 80,
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            boxWidth: 5,
            usePointStyle: true,
          }
        },
      },
    });
  }
}
