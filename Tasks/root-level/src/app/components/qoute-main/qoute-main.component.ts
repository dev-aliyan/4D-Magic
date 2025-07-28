import { QoutesService } from './../../services/qoutes.service';
import { Component, OnInit } from '@angular/core';
import { Qoute } from '../../Qoute';

@Component({
  selector: 'app-qoute-main',
  templateUrl: './qoute-main.component.html',
  styleUrl: './qoute-main.component.css'
})
export class QouteMainComponent implements OnInit {
 
  qoutes: Qoute [] = [];

  constructor (private QoutesService : QoutesService ) {}

  ngOnInit(): void {
    this.qoutes = this.QoutesService.getQoutes();
  }
}
