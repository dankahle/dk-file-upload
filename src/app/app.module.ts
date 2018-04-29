import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Comp1Component } from './comps/comp1/comp1.component';
import {FormsModule} from '@angular/forms';
import {ContactService} from './contact.service';
import {HttpClientModule} from '@angular/common/http';
import {FileService} from './file.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule} from '@angular/material';
import { Ng2FileUploadComponent } from './comps/ng2-file-upload/ng2-file-upload.component';
import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Ng2FileUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    FileUploadModule
  ],
  providers: [ContactService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
