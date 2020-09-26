import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  myChart: any;
  
  constructor(@Inject(MAT_DIALOG_DATA)  public data: any) { }

  ngOnInit(): void {
    console.log("properties in chart:", this.data);
    this.buildChart();
    
  }
  
  
  

  
       
       
       
     
       buildChart(){
        const under18 = this.data.propertieOfLeayer.Under18;
        const over65 = this.data.propertieOfLeayer.Over65;
        console.log(under18, over65);
         this.myChart = new Chart("myChart", {
           type: 'bar',
           data: {
             labels: ['UNDER_18', 'OVER_65'],
             datasets: [
               
               {
               
               data: [under18, over65],
               backgroundColor: ['#8B0000', '#FF0000'],
               borderWidth: 3
             }
           ]
           },
           options: {
             legend: {
               display: false
             },
             scales:{
               xAxes: [{
                 display: true
               }],
               yAxes:[{
                 display:true
               }]
             }
           }
         });
         
        }
     
     }