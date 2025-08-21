import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnInit, AfterViewInit, OnDestroy  {
  @Input() message!: string;

  ngOnInit() { console.log('ngOnInit - input received:', this.message); }
  ngAfterViewInit() { console.log('ngAfterViewInit - DOM is ready'); }
  ngOnDestroy() { console.log('ngOnDestroy - cleanup done'); }

}
