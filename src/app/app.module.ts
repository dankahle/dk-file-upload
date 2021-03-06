import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Comp1Component } from './comps/comp1/comp1.component';
import {FormsModule} from '@angular/forms';
import {ContactService} from './contact.service';
import {HttpClientModule} from '@angular/common/http';
import {FileService} from './file.service';


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ContactService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
