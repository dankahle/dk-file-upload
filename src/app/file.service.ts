import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';
import {FsFile} from './fsfile';

const apiUrl = 'http://localhost:3005';


@Injectable()
export class FileService {

  constructor(protected httpClient: HttpClient) {
  }

  getMany(): Observable<FsFile[]> {
    return this.httpClient.get<FsFile[]>(`${apiUrl}/api/file`);
  }

  getOne(id: number): Observable<FsFile> {
    return this.httpClient.get<FsFile>(`${apiUrl}/api/file/${id}`);
  }

  directory = 'profitability.business-upload';

  addMany(files: FileList): Observable<FsFile> {
    if (!files || !this.directory) {
      console.error('files or directory missing');
      return Observable.throw('Files or directory missing');
    }
    const formData: FormData = new FormData();
    formData.append('fileUploadDirectory', this.directory);
    _.forEach(files, file => formData.append('fileUploadField', file, file.name))
    const fdOptions = {headers: {Accept: 'application/json'}};
    return this.httpClient.post<FsFile>(`${apiUrl}/api/file/multiple`, formData, fdOptions);
  }

  addOne(file: File): Observable<FsFile> {
    if (!file || !this.directory) {
      console.error('files or directory missing');
      return Observable.throw('Files or directory missing, or not a single file');
    }
    const formData: FormData = new FormData();
    formData.append('fileUploadDirectory', this.directory);
    formData.append('fileUploadField', file, file.name);
    const fdOptions = {headers: {Accept: 'application/json'}};
    return this.httpClient.post<FsFile>(`${apiUrl}/api/file/single`, formData, fdOptions);
  }

  update(data: FsFile): Observable<FsFile> {
    return this.httpClient.put<FsFile>(`${apiUrl}/api/file/${data.id}`, data);
  }

  remove(id: number): Observable<FsFile> {
    return this.httpClient.delete<FsFile>(`${apiUrl}/api/file/${id}`);
  }
}
