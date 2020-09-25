import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../map.service';
//import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ChartComponent } from '../chart/chart.component';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  private states;

  constructor(private mapService: MapService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initMap();
    //this.buildChart();
    
  }

  ngAfterViewInit(): void {
    this.mapService.getShapes().subscribe((data) => {
      this.states = data;
      this.drawFeatureCollection();
    });
  }

  

  drawFeatureCollection() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#DB65B',
      }),
      onEachFeature: (feature, layer) => (
        this.drawLayer(layer),
        layer.on({
          mouseover: (e) => this.showPopUp(e),
          mouseout: (e) => this.resetFeatures(e),
          click: (e) => this.showAllDatesInPopup(e),
        })
      ),
    });
    this.map.addLayer(stateLayer);
  }

  //********** HOVER POPUP */
  showPopUp(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      // color: '#DFA612',
      // fillOpacity: 1.0,
      // fillColor: '#FAE042'
    });
    console.log(layer);
    // console.log(layer.feature);
    // console.log(layer.feature.properties.County);

    const propertie = layer.feature.properties;
    layer
      .bindPopup(
        `<center>
                        <p>
                        COUNTRY<br>
                        <strong>${propertie.County}</strong><br><br>
                        NAMELSAD10<br>
                        <strong>${propertie.NAMELSAD10}</strong><br><br>
                        REGION<br>
                        <strong>${propertie.Region}</strong><br><br>
                        SV_Index2<br>
                        <strong>${propertie.SV_Index2}</strong><br>
                        </p>
                        </center>`
      )
      .openPopup();
  }

  // ********** CLICK POPUP
  showAllDatesInPopup(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
    });
    const propertie = layer.feature.properties;

    const content = `<div style="overflow: scroll; height: 250px; width:200px" >
                      <center>
                      <button class="chartbutton">ShowChart</button>
                      
                        <p>
                        COUNTRY<br>
                        <strong>${propertie.County}</strong><br><br>
                        NAMELSAD10<br>
                        <strong>${propertie.NAMELSAD10}</strong><br><br>
                        REGION<br>
                        <strong>${propertie.Region}</strong><br><br>
                        SV_Index2<br>
                        <strong>${propertie.SV_Index2}</strong><br>
                        </p>EMPLOYMENT<br>
                        <strong>${propertie.Employment}</strong><br>
                        </p>RENTERS<br>
                        <strong>${propertie.Renters}</strong><br>
                        </p>MINORITY<br>
                        <strong>${propertie.Minority}</strong><br>
                        </center>
                      </div>`;

    layer.bindPopup(content).on('popupopen', (a) => {
      var popUp = a.target.getPopup();
      popUp
        .getElement()
        .querySelector('.chartbutton')
        .addEventListener('click', (e) => {
          this.openChart(propertie);
        });
    });
  }

  openChart(properties) {
    console.log(properties.County);
    this.dialog.open(ChartComponent, {
      data: { propertieOfLeayer: properties },
    });
  }

  drawLayer(layer) {
    const propertie = layer.feature.properties;
    //E kuqe erret
    if (propertie.SV_Index2 >= 0 && propertie.SV_Index2 < 0.1) {
      layer.setStyle({
        color: '#8B0000',
        fillColor: '#8B0000',
      });
      //E kuqe
    } else if (propertie.SV_Index2 >= 0.1 && propertie.SV_Index2 < 0.2) {
      layer.setStyle({
        color: '#FF0000',
        fillColor: '#FF0000',
      });
      //portokalli e erret
    } else if (propertie.SV_Index2 >= 0.2 && propertie.SV_Index2 < 0.3) {
      layer.setStyle({
        color: '#FF8C00',
        fillColor: '#FF8C00',
      });
      //portokalli
    } else if (propertie.SV_Index2 >= 0.3 && propertie.SV_Index2 < 0.4) {
      layer.setStyle({
        color: '#FFA500',
        fillColor: '#FFA500',
      });
      //portokalli e celur
    } else if (propertie.SV_Index2 >= 0.4 && propertie.SV_Index2 < 0.5) {
      layer.setStyle({
        color: '#DAA520',
        fillColor: '#DAA520',
      });
      //e gjelber e lehte
    } else if (propertie.SV_Index2 >= 0.5 && propertie.SV_Index2 < 0.6) {
      layer.setStyle({
        color: '#90EE90',
        fillColor: '#90EE90',
      });
      //pak me forte
    } else if (propertie.SV_Index2 >= 0.6 && propertie.SV_Index2 < 0.7) {
      layer.setStyle({
        color: '#00FA9A',
        fillColor: '#00FA9A',
      });
    } else if (propertie.SV_Index2 >= 0.7 && propertie.SV_Index2 < 0.8) {
      layer.setStyle({
        color: '#2E8B57',
        fillColor: '#2E8B57',
      });
    } else if (propertie.SV_Index2 >= 0.8 && propertie.SV_Index2 < 0.9) {
      layer.setStyle({
        color: '#32CD32',
        fillColor: '#32CD32',
      });
    } else if (propertie.SV_Index2 >= 0.9 && propertie.SV_Index2 < 1) {
      layer.setStyle({
        color: '#008000',
        fillColor: '#008000',
      });
    }
  }

  resetFeatures(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      // color: '#008f68',
      // fillOpacity: 0.8,
      // fillColor: '#DB65B'
    });
  }
 // Create interactive legend
 
    // let legend = new L.Control({position: 'bottomright'});
    //  legend.onAdd() =function (map){
    //    let div = L.DomUtil.create('div', 'info legend'),
    //    svIndexGrades = [0, 0,1, 0,2, 0,3, 0,4, 0,5, 0,6, 0,7, 0,8, 0,9, 1],
    //    labels = [];
       
    //    for(let i=0; i<svIndexGrades.length; i++){
    //         div.innerHTML +=
    //         labels.push(
    //           '<i style="background:' + svIndexGrades[i]  + '"></i> ' +
    //         svIndexGrades[i] + (svIndexGrades[i + 1] ? '&ndash;' + svIndexGrades[i + 1] + '<br>' : '+'));
            
    //       }
    //       return div;

    //  };
     
    getColor(d){
      console.log(d);
      return d>=0 ? '':
      d>=0.1 ? '#8B0000':
      d>=0.2 ? '#FF0000':
      d>=0.3 ? '#FF8C00':
      d>=0.4 ? '#FFA500':
      d>=0.5 ? '#DAA520':
      d>=0.6 ? '#90EE90':
      d>=0.7 ? '#2E8B57':
      d>=0.8 ? '#32CD32':
      d>=0.9 ? '#008000':
      '#FFEDA0';
      
      }

  

  private initMap(): void {
    this.map = L.map('map').setView([40.71274, -74.005974], 10);
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }
    );
    tiles.addTo(this.map);
//************ LEGEND************ */
// let legend = new L.Control({position: 'bottomright'});
// legend.onAdd = function(map){
//   let div = L.DomUtil.create('div', 'info legend'),
//   svIndexGrades = [0, 0,1, 0,2, 0,3, 0,4, 0,5, 0,6, 0,7, 0,8, 0,9, 1],
//   labels = [];
//   for(let i=0; i<svIndexGrades.length; i++){
//     div.innerHTML +=
//     labels.push(
//       '<i style="background:' + svIndexGrades[i]  + '"></i> ' +
//     svIndexGrades[i] + (svIndexGrades[i + 1] ? '&ndash;' + svIndexGrades[i + 1] + '<br>' : '+'));
    
//   }
//   return div;
// };

let legend = new L.Control({position: 'bottomright'});
legend.onAdd = function(map){
       let div = L.DomUtil.create('div', 'info legend'),
       svIndexGrades = [0, 0,1, 0,2, 0,3, 0,4, 0,5, 0,6, 0,7, 0,8, 0,9, 1],
       labels = [];
       for(let i=0; i<svIndexGrades.length; i++){
            div.innerHTML +=
            labels.push(
              '<i style="background:' + svIndexGrades[i]  + '"></i> ' +
              svIndexGrades[i] + (svIndexGrades[i + 1] ? '&ndash;' + svIndexGrades[i + 1] + '<br>' : '+'));
            
          }
          return div;

     };
     legend.addTo(this.map);
     `<style>
.info {
padding: 6px 8px;
font: 14px/16px Arial, Helvetica, sans-serif;
background: white;
background: rgba(255,255,255,0.8);
box-shadow: 0 0 15px rgba(0,0,0,0.2);
border-radius: 5px;
}
.legend {
background-color: “black”;
line-height: 25px;
color: #555;
width: auto;
}
.legend i {
width: 18px;
height: 18px;
float: left;
margin-right: 8px;
opacity: 0.7;
}
</style>`

    
   

    


   
    
    
    






    
    //vendos markera
    //var marker = L.marker([40.692778, -73.990278]).addTo(this.map);
    //var marker = L.marker([40.711417, -74.06476]).addTo(this.map);

    //var data =  L.geoJSON(data).addTo(this.map);

    //vendos circle
    //   var circle = L.circle([40.692778, -73.990278], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(this.map);

    //vendos poligone
    // var polygon = L.polygon([
    //   [40.711417, -74.06476],
    //   [40.692778, -73.990278],
    //   [40.768903, -74.015427]
    // ]).addTo(this.map);

    // //PopUp
    // var popup = L.popup()
    //     .setLatLng([40.692778, -73.990278])
    //     .setContent("I am a standalone popup.")
    //     .openOn(this.map);

    //   }
    //    popup = L.popup();
    //   onMapClick(e){
    //     this.popup
    //     .setLatLng(e.latlang)
    //     .setContent("You clicked the map at "+ e.latlang.toString())
    //     .openOn(this.map);
  }

  // ********************* CHART***************

  //  buildChart(){
  //   const myChart = new Chart("myChart", {
  //     type: 'bar',
  //     data: {
  //       labels: ['Dark Red','Red', 'Dark Orange', 'Orange', 'Golden Rod', 'Light Green', 'Spring Green', 'Sea Green', '	Lime Green', 'Green'],
  //       datasets: [{
  //         data: [0 ,0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
  //         backgroundColor: ['8B0000', '#FF0000', '#FF8C00', '#FFA500', '#DAA520', '#90EE90', '#00FA9A', '#2E8B57', '#32CD32', '#008000'],
  //         borderWidth: 3
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });

  //  }
}
