import { Injectable, Inject, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { observable, Observable, Subject } from 'rxjs';
import { ElectricSignal } from '../interfaces/signal.model'


@Injectable({
  providedIn: 'root'
})

export class SignalRService {


  private hubConnection: signalR.HubConnection;
  public subj : Subject<ElectricSignal> = new Subject<ElectricSignal>();


  public startConnection = () : Promise<void> => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/service')
      .build();

    return this.hubConnection
      .start()
  }


  public startStreaming() {
    this.hubConnection.stream("StreamSignals").subscribe(this.subj);
  }

}
