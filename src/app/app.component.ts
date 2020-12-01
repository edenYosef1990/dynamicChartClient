import { Component , ElementRef , AfterViewInit , ViewChild, OnInit} from '@angular/core';
import { ScopeSignalsService } from './services/signal.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chartProject';

  @ViewChild('rendererCanvas') rendererCanvas : ElementRef;

  public constructor(public scopeSignalsService : ScopeSignalsService){}

  ngOnInit() {
    this.scopeSignalsService.Connect();
  }

}



