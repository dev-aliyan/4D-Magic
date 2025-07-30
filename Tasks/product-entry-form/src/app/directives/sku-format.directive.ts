import { Directive, forwardRef, Input,  } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appSkuFormat]',
  providers: [
    { 
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => SkuFormatDirective), 
      multi: true 
    }
  ]
})
export class SkuFormatDirective implements Validator {
  @Input('appSkuFormat') skuFormat!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const skuPattern = this.skuFormat.startsWith('SKU-') ? /^SKU-\d{3}$/ : /^[A-Z]{3}-\d{3}$/;
    const isValid = skuPattern.test(control.value);

    if(!isValid) {
      return { invalidSkuFormat: true };
    }

    return null;
  }
  constructor() { }

}
