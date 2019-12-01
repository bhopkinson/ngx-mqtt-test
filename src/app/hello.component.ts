import { Component, Input, OnInit } from '@angular/core';
import { MqttService, IMqttServiceOptions } from 'ngx-mqtt';
import { timer } from 'rxjs';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: true,
  hostname: 'localhost',
  port: 5000,
  protocol: 'ws',
  path: '/mqtt',
  username: 'resistance',
};

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit  {
  @Input() name: string;

  constructor(private _mqtt: MqttService){
    this._mqtt.connect(MQTT_SERVICE_OPTIONS);
  }

  ngOnInit(){
    this._mqtt.onConnect.subscribe((e) => {
      console.log('onConnect', e);
    });
    this._mqtt.onError.subscribe((e) => {
      console.log('onError', e);
    });
    this._mqtt.onClose.subscribe(() => {
      console.log('onClose');
    });
    this._mqtt.onReconnect.subscribe(() => {
      console.log('onReconnect');
    });
    this._mqtt.onMessage.subscribe((e) => {
      console.log('onMessage', e);
    });

    this._mqtt.observe('#').subscribe({
      next: (message) => {console.log(message.payload.toString())}
    });

    timer(0, 1000).subscribe(t => {
      this._mqtt.publish("testtopic", t.toString()).subscribe();
    });

    timer(10000).subscribe(t => {
      var newCredentials = MQTT_SERVICE_OPTIONS;
      newCredentials.password = "test";
      this._mqtt.disconnect();
      this._mqtt.connect(newCredentials);
    });
  }
}
