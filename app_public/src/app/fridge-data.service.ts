import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class Fridge{
  _id: string;
  name: string;
  date: string;
  expiry: string;
  left_overs: boolean;
  quantity: number;
}

@Injectable()
export class FridgeDataService {

  constructor(private http: Http) { 

  }

  private apiBaseUrl = 'http://localhost:3000/api/';
  
  public getItems(): Promise<Fridge[]>{
    const url: string = `${this.apiBaseUrl}/food`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Fridge[])
      .catch(this.handleError);
  }

  /*public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 20;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Location[])
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<any> {
    console.error('API Lookup error', error);
    return Promise.reject(error.message || error);
  }

}