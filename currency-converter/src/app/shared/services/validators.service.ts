
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Injectable()
export class ValidatorsService {

  constructor() { }

   /**
   * Validate the input to accept numbers/decimal numbers
   *
   * @class ValidatorsService
   * @method numberValidtor
   * @return {null|Object} Null if valid.
   */
  static numberValidtor(control: any) {
    if (control.value !== null && control.value !== undefined && control.value.toString().match(/^[1-9]\d*(\.\d+)?$/)) {
      return null;
    } else {
      return { invalidNum: true };
    }
  }

}