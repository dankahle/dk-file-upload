import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-angular-file',
  templateUrl: './angular-file.component.html',
  styleUrls: ['./angular-file.component.scss']
})
export class AngularFileComponent {
  postUrl = environment.apiUrl + '/api/file/single';
  myFormData: FormData; // populated by ngfFormData directive
  httpEvent: HttpEvent<Event>;
  files;
  uploadPercent;

  constructor(public httpClient: HttpClient){}

  uploadFiles(files: File[]): Subscription {
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })

  return this.httpClient.request(config)
    .subscribe(event => {
      this.httpEvent = <HttpEvent<Event>>event

      if (event instanceof HttpResponse) {
      alert('upload complete, old school alert used');
    }
    },
    error => {
      alert('!failure beyond compare cause:' + error.toString())
    });
}
}
