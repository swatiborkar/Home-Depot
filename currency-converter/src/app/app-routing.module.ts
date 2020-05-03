import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';


const routes: Routes = [
  {path: '', redirectTo:'/converter', pathMatch:'full'},
  {path: 'converter', 
  loadChildren: () =>
          import('./converter/converter.module').then(m => m.converterModule)
  },
  {path: 'disclaimer', component: DisclaimerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
