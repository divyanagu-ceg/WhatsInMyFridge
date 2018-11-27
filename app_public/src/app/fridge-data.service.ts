import { Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

export class Fridge {
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

    private apiBaseUrl = 'http://localhost:3000/api';

    public getItems(): Promise < Fridge[] > {
        const url: string = `${this.apiBaseUrl}/food`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Fridge[])
            .catch(this.handleError);
    }

    public deleteItem(itemId): Observable < number > {
        const url: string = `${this.apiBaseUrl}/food/${itemId}`;
        return this.http
            .delete(url)
            .map(response => response.status)
            .catch(this.handleError);
    }

    public addItem(foodItem): Observable < number > {
        const url: string = `${this.apiBaseUrl}/food/`;
        return this.http
            .post(url, foodItem)
            .map(response => response.status)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise < any > {
        console.error('API Lookup error', JSON.stringify(error));
        return Promise.reject(error.message || error);
    }

}