import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

 
  
  constructor(@Inject(MAT_DIALOG_DATA)  public data: any) { }

  ngOnInit(): void {
    console.log("properties in chart:", this.data);
    this.buildChart();
    
  }
  
  
  

  buildChart(){
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Dark Red','Red', 'Dark Orange', 'Orange', 'Golden Rod', 'Light Green', 'Spring Green', 'Sea Green', '	Lime Green', 'Green'],
        datasets: [{
          data: [0 ,0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
          backgroundColor: ['8B0000', '#FF0000', '#FF8C00', '#FFA500', '#DAA520', '#90EE90', '#00FA9A', '#2E8B57', '#32CD32', '#008000'],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    
   }

}
