import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ScopeSignalsService} from '../services/signal.service';
import {Chart} from 'chart.js'
import { sign } from 'crypto';
import { ElectricSignal } from '../interfaces/signal.model';

@Component({
    selector: 'chartView',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {

    @ViewChild('rendererCanvas') rendererCanvas : ElementRef;
    chartData: Array<number>;

    Chart : Chart;

    constructor(public scopeSignalsService : ScopeSignalsService){
        this.chartData = [0,0,0,0,0,0,0,0,0,0];
        scopeSignalsService.ScopeSignalsStream().subscribe(signal => this.OnChartDataUpdate(signal));
    }

    public ngAfterViewInit() : void {
        this.Chart = new Chart(this.rendererCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6','7','8','9','10'],
            datasets: [{
                label: '# of Votes',
                data: this.chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 0 // general animation time
            },
          "responsive": true,
          "maintainAspectRatio": false,
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  fontColor: 'blue'
              },
              scales: {
                yAxes: [{
                    ticks: {
                        fontSize : 5,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }]
            }
          }
      }
        });

        
      }

      enqueue(item: ElectricSignal): void {
        this.chartData.push(item.value);
      }

      dequeue() {
        this.chartData.shift();
  }

    public OnChartDataUpdate(signal : ElectricSignal) : void {
        this.enqueue(signal);
        this.dequeue();
        this.Chart.data.datasets.forEach((dataset) => {
            dataset.data = (this.chartData);
        });
        this.Chart.update();
    }
}