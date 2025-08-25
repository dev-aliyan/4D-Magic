import { Component, OnInit } from '@angular/core';
import { TempService } from '../../services/temp.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'] // ✅ fixed typo
})
export class MainComponent implements OnInit {
  jsonData: any;

  constructor(private tempService: TempService) {}

  ngOnInit(): void {
    this.tempService.getJsonData().subscribe((data) => {
      this.jsonData = data;
      console.log(this.jsonData);
    });
  }

    
}
