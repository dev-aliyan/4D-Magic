import { Component, OnInit } from '@angular/core';
import { LogServiceService } from '../../services/log-service.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.css',
  providers: [LogServiceService]
})
export class LoggerComponent implements OnInit {
  logs: string [] = [];

  constructor(private LogService: LogServiceService) { }
  LogMessage() {
    this.LogService.logMessage('Button clicked: ');  
  }

  ngOnInit(): void {
    this.logs = this.LogService.getLogs();
  }
}
