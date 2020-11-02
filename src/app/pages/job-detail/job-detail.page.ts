import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
declare var cordova: any;

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {

  constructor(
    private pdfGenerator: PDFGenerator,
    private previewAnyFile: PreviewAnyFile
  ) { }

  ngOnInit() {
  }

  viewPDF() {
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Quotation.pdf'
    }

    this.pdfGenerator.fromURL('https://github.com/farbaks', options)
      .then(() => 'ok')
      .catch((err) => console.log(err))
    // this.previewAnyFile.preview('http://127.0.0.1:8000/quotation')
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));
  }

}
