import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'; 
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as converterActions from '../state/converter.actions';

@Injectable()
export class ConverterEffects{ 
    constructor(private currencyService : CurrencyService,
        private actions$: Actions){}
    
        @Effect()
        loadRates$: Observable<Action> = this.actions$.pipe(
          ofType(converterActions.ConverterActionTypes.Load),
          mergeMap(action =>
            this.currencyService.getRates().pipe(
              map(rates => (new converterActions.LoadSuccess(rates))),
              catchError(err => of(new converterActions.LoadFail(err)))
            )
          )
        );
}