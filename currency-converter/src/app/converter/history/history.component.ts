import {Component, Input} from '@angular/core';
import { History } from './history';
@Component({
    selector:'history',
    templateUrl:'./history.component.html',
    styleUrls:['./history.component.scss']
})

export class HistoryComponent{
    @Input() list:History[];

}