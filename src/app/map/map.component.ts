import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../map.service';
//import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ChartComponent } from '../chart/chart.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;
  private states;

  constructor(private mapService: MapService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.initMap();
    //this.buildChart();



    
  }

  ngAfterViewInit(): void {
    this.mapService.getShapes().subscribe(data => {
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
        fillColor: '#DB65B'
      }),
      onEachFeature: (feature, layer) => (
        this.drawLayer(layer),
        layer.on({
          mouseover: (e) => (this.showPopUp(e)),
          mouseout: (e) => (this.resetFeatures(e)),
          click: (e) => (this.showAllDatesInPopup(e))

        })
      )
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
    layer.bindPopup(`<center>
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
                        </center>`)
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

    const content = `<center>
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
                      <button class="chartbutton">ShowChart</button>
                      </center>`;


        layer.bindPopup(content).on("popupopen", (a) => {
          var popUp = a.target.getPopup()
          popUp.getElement()
          .querySelector(".chartbutton")
          .addEventListener("click", e => {
          this.openChart(propertie);
          });
        });
      
        }
  

openChart(properties){
  console.log(properties.County);
  this.dialog.open(ChartComponent, properties);
}

  drawLayer(layer) {
    const propertie = layer.feature.properties;
    //E kuqe erret
    if (propertie.SV_Index2 >= 0 && propertie.SV_Index2 < 0.1) {
      layer.setStyle({
        color: '#8B0000',
        fillColor: '#8B0000'
      });
      //E kuqe
    } else if (propertie.SV_Index2 >= 0.1 && propertie.SV_Index2 < 0.2) {
      layer.setStyle({
        color: '#FF0000',
        fillColor: '#FF0000'
      });
      //portokalli e erret
    } else if (propertie.SV_Index2 >= 0.2 && propertie.SV_Index2 < 0.3) {
      layer.setStyle({
        color: '#FF8C00',
        fillColor: '#FF8C00'
      });
      //portokalli
    } else if (propertie.SV_Index2 >= 0.3 && propertie.SV_Index2 < 0.4) {
      layer.setStyle({
        color: '#FFA500',
        fillColor: '#FFA500'
      });
      //portokalli e celur
    } else if (propertie.SV_Index2 >= 0.4 && propertie.SV_Index2 < 0.5) {
      layer.setStyle({
        color: '#DAA520',
        fillColor: '#DAA520'
      });
      //e gjelber e lehte
    } else if (propertie.SV_Index2 >= 0.5 && propertie.SV_Index2 < 0.6) {
      layer.setStyle({
        color: '#90EE90',
        fillColor: '#90EE90'
      });
      //pak me forte
    } else if (propertie.SV_Index2 >= 0.6 && propertie.SV_Index2 < 0.7) {
      layer.setStyle({
        color: '#00FA9A',
        fillColor: '#00FA9A'
      });
    } else if (propertie.SV_Index2 >= 0.7 && propertie.SV_Index2 < 0.8) {
      layer.setStyle({
        color: '#2E8B57',
        fillColor: '#2E8B57'
      });
    } else if (propertie.SV_Index2 >= 0.8 && propertie.SV_Index2 < 0.9) {
      layer.setStyle({
        color: '#32CD32',
        fillColor: '#32CD32'
      });
    } else if (propertie.SV_Index2 >= 0.9 && propertie.SV_Index2 < 1) {
      layer.setStyle({
        color: '#008000',
        fillColor: '#008000'
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





  private initMap(): void {
    this.map = L.map('map').setView([40.71274, -74.005974], 10);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,

    });
    tiles.addTo(this.map);
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

