import { Component, OnInit, OnDestroy } from '@angular/core';
import { ValidatorsService } from '../shared/services/validators.service';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Currency } from './currency';
import { Observable, Subscription} from 'rxjs';
import * as fromConverter from './state/converter.reducer';
import * as converterActions from './state/converter.actions';
import { Store, select } from '@ngrx/store';
import { History } from './history/history';

@Component({
    selector:'converter',
    templateUrl:'./converter.component.html',
    styleUrls:['./converter.component.scss']
})

export class ConverterComponent implements OnInit, OnDestroy{             
    currencyForm : FormGroup;
    rates: Currency[];
    errorMessage$: Observable<string>;
    history$: Observable<History[]>;
    ratesSubscription: Subscription;
    fromRateSubscription: Subscription;
    toRateSubscription: Subscription;
    amountSubscription: Subscription;
    resultSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
        private store: Store<fromConverter.State>){}

    ngOnInit(){  
        this.initFormGroup();
        this.getRatesData();  
    }

    getRatesData(){ 
        this.ratesSubscription = this.store.pipe(select(fromConverter.getRates)).subscribe(
            (rates) => {
                this.rates = rates;
                if(this.rates.length){
                       this.getFromRates();
                       this.getToRates();   
                       this.getResult();
                       this.getConversionList();  
                       this.getAmount();     
                }
            }
        );
    
        if(!this.rates.length){
            this.errorMessage$ = this.store.pipe(select(fromConverter.getError));
            this.store.dispatch(new converterActions.Load());
        }        
    }

  
    initFormGroup(){
        this.currencyForm = this.formBuilder.group({
            amount: ['', [Validators.required,ValidatorsService.numberValidtor]],
            fromRate:[null, Validators.required],
            toRate:[null, Validators.required],
            result:['']
        });       
    }

    getFromRates(){
        this.fromRateSubscription = this.store.pipe(select(fromConverter.getFromRate)).subscribe(
            (fromRate:Currency) => {
                const fromRateObj = this.rates.find(c => c.code == fromRate.code);
                this.currencyForm.patchValue({
                    fromRate: fromRateObj
                });   
            }
        )  
    }

    getToRates(){
        this.toRateSubscription = this.store.pipe(select(fromConverter.getToRate)).subscribe(
            (toRate:Currency) => {
                const toRateObj = this.rates.find(c => c.code == toRate.code);
                this.currencyForm.patchValue({
                    toRate: toRateObj
                });
            }
        )
    }

    getAmount(){
        this.amountSubscription = this.store.pipe(select(fromConverter.getAmount)).subscribe(
            amount => {
                this.currencyForm.patchValue({
                    amount: amount
                })
            }
        );
    }

    inputChanged(){
        if(this.currencyForm.valid){
            const amount = this.currencyForm.value.amount;
            const fromRate = this.currencyForm.value.fromRate;
            const toRate = this.currencyForm.value.toRate;
            this.store.dispatch(new converterActions.InputChange(amount, fromRate, toRate));            
        }    
    }

    getResult(){
        this.resultSubscription = this.store.pipe(select(fromConverter.getResult)).subscribe(
            result => {
                this.currencyForm.patchValue({
                    result: result
                })
            }
        );
    }

    getConversionList(){
        this.history$ = this.store.pipe(select(fromConverter.getConversionList));             
    }

    ngOnDestroy(){
        this.ratesSubscription.unsubscribe();
        this.fromRateSubscription.unsubscribe();
        this.toRateSubscription.unsubscribe();
        this.amountSubscription.unsubscribe();
        this.resultSubscription.unsubscribe();
    }
}