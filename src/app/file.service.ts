import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {File} from './file';
import * as _ from 'lodash';

const apiUrl = 'http://localhost:3005';


@Injectable()
export class FileService {
  endpointName = 'file';

  constructor(protected httpClient: HttpClient) {
  }

  getMany(): Observable<File[]> {
    return this.httpClient.get<File[]>(`${apiUrl}/api/${this.endpointName}`);
  }

  getOne(id: number): Observable<File> {
    return this.httpClient.get<File>(`${apiUrl}/api/${this.endpointName}/${id}`);
  }

  add(data) {
    return this.httpClient.post<File>(`${apiUrl}/api/${this.endpointName}`, data);
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
    return this.httpClient.post<File>(`${apiUrl}/api/${this.endpointName}`, formData, fdOptions);
  }

  update(data: File): Observable<File> {
    return this.httpClient.put<File>(`${apiUrl}/api/${this.endpointName}/${data.id}`, data);
  }

  remove(id: number): Observable<File> {
    return this.httpClient.delete<File>(`${apiUrl}/api/${this.endpointName}/${id}`);
  }
}
