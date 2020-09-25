import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private imagePicker: ImagePicker) { }

  ngOnInit() {
  }
  hasReadPermission() {
    this.imagePicker.hasReadPermission().then((result) => {
      if(result == false){
        this.requestReadPermission();
      }
    })
  }

  requestReadPermission() {
    // no callbacks required as this opens a popup which returns async
    this.imagePicker.requestReadPermission();
  }
  choosePicture() {
    let options = {
      maximumImagesCount: 10,
      width: 800,
      outputType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
