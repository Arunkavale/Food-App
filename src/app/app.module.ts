import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CustomerRegisterationComponent } from './customer-registeration/customer-registeration.component';
import {CustomerLoginComponent } from './customer-login/customer-login.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegisterationComponent,
    CustomerLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
