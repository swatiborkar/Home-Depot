import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,  map } from 'rxjs/operators';
import { Currency } from './currency';


@Injectable()
export class CurrencyService {

    constructor(private http: HttpClient){}

    getRates(): Observable<Currency[]> {
        return this.http.get<any>('https://api.exchangeratesapi.io/latest').
        pipe(
            map(result => {
                return Object.keys(result.rates).map((key, index) => { 
                    return { code: key, value: result.rates[key] };
                });
            }),
            catchError(this.handleError)  
        );
    }

    private handleError(err) {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      errorMessage = `${err.status}: ${err.message}`;
      console.error(err);
      return throwError(errorMessage);
    }
}