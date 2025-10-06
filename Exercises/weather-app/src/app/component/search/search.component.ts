import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
    // listen to input changes with debounce
    
  }

  onSearchClick() {
    fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map((e: any) => (e.target as HTMLInputElement).value.trim()),
      debounceTime(1000),             
      distinctUntilChanged()         
    ).subscribe(value => {
      if (value.length >= 5) {      
        this.search.emit(value);
      }
    });

    const value = this.form.get('query')?.value?.trim();
    if (value && value.length >= 5) {
      this.search.emit(value);
    }
  }
}
