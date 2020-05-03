import * as fromRoot from '../../state/app.state';
import { Currency } from '../currency';
import { ConverterActionTypes, ConverterActions } from '../state/converter.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { History } from '../history/history';

// Extends the app state to include the converter feature.
// This is required because converter are lazy loaded.
// So the reference to ConverterState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    converter: ConverterState;
  }
  
  // State for this feature (Converter)
  export interface ConverterState {
    amount:number;
    fromRate:Currency,
    toRate:Currency,
    result:number,
    rates:Currency[],
    conversionList:History[],
    error: string
  }

  const initialState: ConverterState = {
    amount:0,
    fromRate:  {
      code: 'CAD',
      value: 1.5129
    }, 
    toRate: {
      code: 'USD',
      value: 1.0842
    }, 
    result:null,
    rates:[],
    conversionList:[],
    error:''
  }

  // Selector functions
const getConverterFeatureState = createFeatureSelector<ConverterState>('converter');

export const getAmount = createSelector(
  getConverterFeatureState,
  state => state.amount
);

export const getRates = createSelector(
  getConverterFeatureState,
  state => state.rates
);

export const getError = createSelector(
  getConverterFeatureState,
  state => state.error
);

export const getFromRate = createSelector( 
  getConverterFeatureState,
  state => state.fromRate
);

export const getToRate = createSelector( 
  getConverterFeatureState,
  state => state.toRate
);

export const getResult = createSelector(
  getConverterFeatureState,
  state => state.result
);

export const getConversionList = createSelector(
  getConverterFeatureState,
  state => state.conversionList
)

export function reducer(state = initialState, action: ConverterActions): ConverterState {
    
    switch(action.type){
        case ConverterActionTypes.LoadSuccess:
            return {
                ...state, 
                rates: action.payload,
                error: ''
            }
        case ConverterActionTypes.LoadFail:
            return {
                ...state,
                rates: [],
                error: action.payload
            }
        case ConverterActionTypes.InputChange:            
            var currentTime = getTimeDate()
            var result = +((action.toRate.value/action.fromRate.value) * action.amount).toFixed(2);
            return {
                ...state, 
                amount:action.amount,
                fromRate:action.fromRate,
                toRate:action.toRate,
                result: result,
                conversionList: [...state.conversionList,
                  { amount: action.amount,from: action.fromRate.code,
                    to:action.toRate.code, result:result,
                    date:currentTime.date, time: currentTime.time
                  }]
            }
        default:
            return state; 
    }
  }

  /* function to compute date and time as per given format */
  function getTimeDate(){
      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear().toString().substr(-2);
      var hours = today.getHours();
      var minutes = today.getMinutes().toString();
      var seconds = today.getSeconds().toString();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes.length < 2 ? '0'+ minutes : minutes;
      seconds = seconds.length < 2 ? '0'+ seconds : seconds;
      var strTime = hours + ':' + minutes + ':' + seconds + ' '+ ampm;
      return {date:date, time:strTime};
  }

  