/* NgRx */
import { Action } from '@ngrx/store';
import { Currency } from '../currency';

export enum ConverterActionTypes {
    Load = '[Rates] Load',
    LoadSuccess = '[Rates] Load Success',
    LoadFail = '[Rates] Load Fail',
    InputChange = '[Rates] Input Change'
}

// Action Creators
export class Load implements Action {
    readonly type = ConverterActionTypes.Load;
}

export class LoadSuccess implements Action{
    readonly type = ConverterActionTypes.LoadSuccess;
    constructor(public payload: Currency[]){}
}

export class LoadFail implements Action{
    readonly type = ConverterActionTypes.LoadFail;
    constructor(public payload: string){}
}

export class InputChange implements Action{
    readonly type = ConverterActionTypes.InputChange;
    constructor(public amount: number, 
        public fromRate: Currency,
        public toRate: Currency){}
}

// Union the valid types
export type ConverterActions = Load
| LoadSuccess
| LoadFail
| InputChange;
