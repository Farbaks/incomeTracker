import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  constructor(private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  share() {
    this.socialSharing.share(
      'Seed Block Algorithm sample pdfs',
      'Seed Block Algorithm',
      [
        'http://www.ijstm.com/images/short_pdf/1431859738_525.pdf',
        'http://www.chennaisunday.com/IEEE%202013%20Java%20Basepaper/Seed%20Block%20Algorithm%20A%20Remote%20Smart%20Data%20Back-up%20Technique%20for%20Cloud%20Computing.pdf'
      ],
      'http://www.ijfrcsce.org/download/browse/Volume_4/April_18_Volume_4_Issue_4/1524130771_19-04-2018.pdf');
  }
}
