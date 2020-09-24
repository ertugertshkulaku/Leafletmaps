import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
   capitals:string = 'assets/mapGeoJson.json';
   

  constructor(private http: HttpClient) { }

  public getShapes(): Observable<any>{
    return this.http.get(this.capitals);
  };

 

  
  }

