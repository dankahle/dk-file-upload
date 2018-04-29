import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';
import {FsFile} from './fsfile';
import {environment} from '../environments/environment';

const apiUrl = environment.apiUrl;
const directory = 'module1.section3';

@Injectable()
export class FileService {


  constructor(protected httpClient: HttpClient) {
  }

  getInfoMany(): Observable<FsFile[]> {
    return this.httpClient.get<FsFile[]>(`${apiUrl}/api/file/info`, {params: {directory} });
  }

  getInfoOne(id: number): Observable<FsFile> {
    return this.httpClient.get<FsFile>(`${apiUrl}/api/file/info/${id}`);
  }


  download(id) {
    return this.httpClient.get<any>(`${apiUrl}/api/file/${id}`);
  }

  remove(id: number): Observable<FsFile> {
    return this.httpClient.delete<FsFile>(`${apiUrl}/api/file/${id}`);
  }

  uploadMany(files: FileList): Observable<FsFile> {
    if (!files || !directory) {
      console.error('files or directory missing');
      return Observable.throw('Files or directory missing');
    }
    const formData: FormData = new FormData();
    formData.append('fileUploadDirectory', directory);
    _.forEach(files, file => formData.append('fileUploadField', file, file.name))
    const fdOptions = {headers: {Accept: 'application/json'}};
    return this.httpClient.post<FsFile>(`${apiUrl}/api/file/multiple`, formData, fdOptions);
  }

  uploadOne(file: File): Observable<FsFile> {
    if (!file || !directory) {
      console.error('files or directory missing');
      return Observable.throw('Files or directory missing, or not a single file');
    }
    const formData: FormData = new FormData();
    formData.append('fileUploadDirectory', directory);
    formData.append('fileUploadField', file, file.name);
    const fdOptions = {headers: {Accept: 'application/json'}};
    return this.httpClient.post<FsFile>(`${apiUrl}/api/file/single`, formData, fdOptions);
  }


}
