import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

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
  constructor() {
    this.position = window.pageYOffset;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadChart();
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

  loadChart() {
    // Line chart
    let ctx = this.myChart.nativeElement;
    ctx.fillStyle = "red";
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Income',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
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
          data: [350, 34, 16],
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
