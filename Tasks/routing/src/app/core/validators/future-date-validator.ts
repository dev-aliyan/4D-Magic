import { AbstractControl, ValidationErrors } from "@angular/forms";

export function futureDateValidator(control: AbstractControl) : ValidationErrors | null {
    if(!control.value) return null
    //Future Date Validator form will be invalid if the date is not future date
    const today = new Date();
    const selected = new Date(control.value);
    return selected > today ? null : { futureDate : true }
}