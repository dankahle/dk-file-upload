import {Injectable, Contactype} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Contact} from "./contact";

const apiUrl = 'http://localhost:3005';



@Injectable()
export class ContactService {

  constructor(private endpointName: string, protected httpClient: HttpClient) {
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

  update(data: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${apiUrl}/api/${this.endpointName}/${data.id}`, data);
  }

  remove(id: number): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${apiUrl}/api/${this.endpointName}/${id}`);
  }
}
