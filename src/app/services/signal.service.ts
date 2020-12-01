import { EventEmitter, Injectable} from '@angular/core';
import { SignalRService} from './signalr.service'
import { HttpClient } from '@angular/common/http';
import { ElectricSignal } from '../interfaces/signal.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ScopeSignalsService {

    constructor(public signalRService: SignalRService, private http: HttpClient){
    }

// a great read about promises / async in javascript : https://blog.logrocket.com/async-await-in-typescript/

    public async Connect() : Promise<void> {
        await this.signalRService.startConnection()
        console.log('Connection started');
        this.signalRService.startStreaming();
    }

    ScopeSignalsStream = () : Observable<ElectricSignal> => this.signalRService.subj.asObservable();

    private startHttpRequest = () => {
            this.http.get('https://localhost:5001/api/service')
          .subscribe(res => {
            console.log(res);
          })
      }
}