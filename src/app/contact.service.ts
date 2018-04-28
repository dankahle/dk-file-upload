import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contact} from './contact';
import * as _ from 'lodash';

const apiUrl = 'http://localhost:3005';


@Injectable()
export class ContactService {
  endpointName = 'contact'

  constructor(protected httpClient: HttpClient) {
  }

  getMany(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${apiUrl}/api/${this.endpointName}`);
  }

  getOne(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${apiUrl}/api/${this.endpointName}/${id}`);
  }

  add(data) {
    return this.httpClient.post<Contact>(`${apiUrl}/api/${this.endpointName}`, data);
  }

  directory = 'profitability.business-upload';

  addFd(data, files: FileList) {
    const formData: FormData = new FormData();
    _.forEach(data, (val, key) => formData.append(key, val));
    formData.append('fileUploadDirectory', this.directory);
    const file = files[0];
    formData.append('fileUploadField', file, file.name);
    let options = {
      headers: {
        Accept: 'application/json'
      }
    }
    const fdOptions = {headers: {Accept: 'application/json'}};
    return this.httpClient.post<Contact>(`${apiUrl}/api/${this.endpointName}`, formData, fdOptions);
  }

  update(data: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${apiUrl}/api/${this.endpointName}/${data.id}`, data);
  }

  remove(id: number): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${apiUrl}/api/${this.endpointName}/${id}`);
  }
}
