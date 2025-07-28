import { Injectable } from '@angular/core';

@Injectable()

export class LogServiceService {
  logs: string[] = [];
  
  logMessage(message: string) {
    const timestamp = new Date().toISOString();
    this.logs.push(`${timestamp} - ${message}`);
  }

  getLogs() {
    return this.logs;
  }
  
  constructor() { }
}
