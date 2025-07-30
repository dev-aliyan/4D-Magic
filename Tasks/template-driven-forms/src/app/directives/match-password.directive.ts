import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatchPasswordDirective),
      multi: true
    }
  ]
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') matchTo!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if(!control || !control.parent) return null;

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(!password || !confirmPassword) return null;

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsNotMatch: true };
    }
    return null;
  }
  constructor() { }

}
