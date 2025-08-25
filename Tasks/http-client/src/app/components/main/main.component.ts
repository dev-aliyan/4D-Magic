import { Component } from '@angular/core';
import { TempService } from '../../services/temp.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'] // ✅ fixed typo
})
export class MainComponent {
  jsonData: any;
  city: string = '';

  constructor(private tempService: TempService) {}

  getWeather() {
    if (!this.city) return;
    this.tempService.getJsonData(this.city).subscribe((data) => {
      this.jsonData = data;
      console.log(this.jsonData);
    });
  }
}
