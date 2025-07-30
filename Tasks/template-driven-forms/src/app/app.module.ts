import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MinimumAgeDirective } from './directives/minimum-age.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistrationFormComponent,
    MinimumAgeDirective,
    MatchPasswordDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Importing FormsModule to use template-driven forms
    CommonModule,  // Importing CommonModule for common directives
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
