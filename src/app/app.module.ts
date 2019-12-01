import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { MqttModule } from "ngx-mqtt";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MqttModule.forRoot({ connectOnCreate: false})
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
