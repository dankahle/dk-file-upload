import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';


const options = {
  url: environment.apiUrl + '/api/file/multiple',
  parametersBeforeFiles: true,
  itemAlias: 'fileUploadField',
  additionalParameter: {
    directory: 'module1.section3',
    type: 'sometype'
  },
};

@Component({
  selector: 'app-ng2-file-upload',
  templateUrl: './ng2-file-upload.component.html',
  styleUrls: ['./ng2-file-upload.component.scss']
})
export class Ng2FileUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader(options);
  constructor() { }

  ngOnInit() {
  }

}
