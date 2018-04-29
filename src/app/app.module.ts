import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Comp1Component } from './comps/comp1/comp1.component';
import {FormsModule} from '@angular/forms';
import {ContactService} from './contact.service';
import {HttpClientModule} from '@angular/common/http';
import {FileService} from './file.service';
import { AngularFileComponent } from './comps/angular-file/angular-file.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {ngfModule} from 'angular-file';


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    AngularFileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    ngfModule
  ],
  providers: [ContactService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
