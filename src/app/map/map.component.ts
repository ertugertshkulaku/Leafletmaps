import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
  private propertieOfFeature = null;

  constructor(private mapService: MapService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initMap();
    this.propertieOfFeature = null;
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
    this.propertieOfFeature = null;
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
    });
    this.propertieOfFeature  = layer.feature.properties;

    const content = `<div style="overflow: scroll; height: 250px; width:200px" >
                      <center>
                      <button style="background-color: blue; color:white;" class="chartbutton" id="btn-id">ShowChart</button>
                      
                        <p>
                        COUNTRY<br>
                        <strong>${this.propertieOfFeature.County}</strong><br><br>
                        NAMELSAD10<br>
                        <strong>${this.propertieOfFeature.NAMELSAD10}</strong><br><br>
                        REGION<br>
                        <strong>${this.propertieOfFeature.Region}</strong><br><br>
                        SV_Index2<br>
                        <strong>${this.propertieOfFeature.SV_Index2}</strong><br>
                        </p>EMPLOYMENT<br>
                        <strong>${this.propertieOfFeature.Employment}</strong><br>
                        </p>RENTERS<br>
                        <strong>${this.propertieOfFeature.Renters}</strong><br>
                        </p>MINORITY<br>
                        <strong>${this.propertieOfFeature.Minority}</strong><br>
                        </center>
                      </div>`;

    layer.bindPopup(content);
  }
  @HostListener('document: click', ['$event'])
  openClickEvent(event: MouseEvent){
    let target = event.target || event.srcElement;
    let id = target['id'];
    if(id === 'btn-id'){
    this.openChart(this.propertieOfFeature);
    }
  }

  openChart(properties) {
    //console.log(properties.County);
    this.dialog.open(ChartComponent, {
      data: { propertieOfLeayer: properties },
    });
  }

  drawLayer(layer) {
    const propertie = layer.feature.properties;
   
    if (propertie.SV_Index2 >= 0 && propertie.SV_Index2 < 0.1) {
      layer.setStyle({
        color: '#8B0000',
        fillColor: '#8B0000',
      });
     
    } else if (propertie.SV_Index2 >= 0.1 && propertie.SV_Index2 < 0.2) {
      layer.setStyle({
        color: '#FF0000',
        fillColor: '#FF0000',
      });
     
    } else if (propertie.SV_Index2 >= 0.2 && propertie.SV_Index2 < 0.3) {
      layer.setStyle({
        color: '#FF8C00',
        fillColor: '#FF8C00',
      });
     
    } else if (propertie.SV_Index2 >= 0.3 && propertie.SV_Index2 < 0.4) {
      layer.setStyle({
        color: '#FFA500',
        fillColor: '#FFA500',
      });
     
    } else if (propertie.SV_Index2 >= 0.4 && propertie.SV_Index2 < 0.5) {
      layer.setStyle({
        color: '#DAA520',
        fillColor: '#DAA520',
      });
      
    } else if (propertie.SV_Index2 >= 0.5 && propertie.SV_Index2 < 0.6) {
      layer.setStyle({
        color: '#90EE90',
        fillColor: '#90EE90',
      });
    
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

    let legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = (infoLegend) => {
      let div = L.DomUtil.create('div', 'info-legend'),
        svIndexGrades = ['0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.9-1'],
        labels = ['<strong>Legend</strong>'],
        color = '#008010';
      console.log(svIndexGrades);
      for (let i = 0; i < svIndexGrades.length; i++) {
        color = this.getColorOfLegend(svIndexGrades[i]);
        div.innerHTML += labels.push('<i style="height: 10px; width:10px; border-radius: 50%; display: inline-block; background:' + color + '"></i> ' +
          (svIndexGrades[i] ? svIndexGrades[i] : '+'));
      }
      div.innerHTML = labels.join('<br>');
      return div;

    }
    legend.addTo(this.map);



  }
  getColorOfLegend(interval) {
    let color = null;
    if (interval !== null) {
      if (interval === '0-0.1') {
        color = "#8B0000";
      }
      if (interval === '0.1-0.2') {
        color = "#FF0000";
      }
      if (interval === '0.2-0.3') {
        color = "#FF8C00";
      }
      if (interval === '0.3-0.4') {
        color = "#FFA500";
      }
      if (interval === '0.4-0.5') {
        color = "#DAA520";
      }
      if (interval === '0.5-0.6') {
        color = "#90EE90";
      }
      if (interval === '0.6-0.7') {
        color = "#00FA9A";
      }
      if (interval === '0.7-0.8') {
        color = "#2E8B57";
      }
      if (interval === '0.8-0.9') {
        color = "#32CD32";
      }
      if (interval === '0.9-1') {
        color = "#008000";
      }
    }
    return color;
  }

}
