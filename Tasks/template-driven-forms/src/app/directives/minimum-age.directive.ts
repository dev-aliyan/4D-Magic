import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinimumAge]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MinimumAgeDirective),
      multi: true
    }
  ]
})
export class MinimumAgeDirective implements Validator {
  @Input('appMinimumAge') minAge: number = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const age = +value;
    if (isNaN(age) || age < this.minAge) {
      return {
        minAge: {
          requiredAge: this.minAge,
          actualAge: age
        }
      };
    }

    return null;
  }
}
