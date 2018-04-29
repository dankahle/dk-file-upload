import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../contact';
import {ContactService} from '../../contact.service';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';
import {FileService} from '../../file.service';
import {environment} from '../../../environments/environment';
import {FsFile} from '../../fsfile';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  contact = new Contact();
  contacts: Contact[];
  files: FsFile[];
  @ViewChild('fileUp') fileUp;

  constructor(private contactService: ContactService, private fileService: FileService) {
  }

  ngOnInit() {
    this.refresh();
  }

/*
  submit() {
    this.contactService.add(this.contact)
      .subscribe(() => this.refresh());
  }
*/

  refresh() {
    this.contactService.getMany()
      .subscribe(contacts => this.contacts = contacts);
    this.fileService.getInfoMany()
      .subscribe(files => this.files = files);
  }


  submit(event) {

    const fileInput = this.fileUp.nativeElement;
    if (!fileInput.files.length) {
      console.error('please choose a file');
      return;
    }

    this.contactService.add(this.contact)
      .subscribe(contact => {
        this.fileService.uploadMany(fileInput.files)
          .subscribe(files => this.refresh());

        /*
        this.fileService.uploadOne(fileInput.files[0])
          .subscribe(file => this.refresh());
*/
      });

  }

  getDownloadLink(id) {
    return `${environment.apiUrl}/api/file/${id}`;
  }

  remove(id) {
    this.fileService.remove(id)
      .subscribe(fileInfo => this.refresh());

  }


  /*
    fileChange(event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new HttpHeaders();
        /!** In Angular 5, including the header Content-Type can invalidate your request *!/
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = {headers: headers};
        this.http.post(`${this.apiEndPoint}`, formData, options)
          .map(res => res.json())
          .catch(error => Observable.throw(error))
          .subscribe(
            data => console.log('success'),
            error => console.log(error)
          );
      }
    }
  */

}
