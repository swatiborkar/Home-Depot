import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConverterComponent } from './converter.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/converter.reducer';
import { CurrencyService } from './currency.service';
import { EffectsModule } from '@ngrx/effects';
import { ConverterEffects } from './state/converter.effects';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
    {path:'', component:ConverterComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('converter',reducer), 
    EffectsModule.forFeature(
      [ ConverterEffects ]
    )
  ],
  declarations:[ConverterComponent, HistoryComponent],
  providers: [CurrencyService],
  exports: []
})
export class converterModule { }
