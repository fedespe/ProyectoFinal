import { Component, enableProdMode } from '@angular/core';
//import { LoginComponent } from "./login/login.component";
import { APP_PROVIDERS } from './app.providers';
//import { Router } from '@angular/router';

enableProdMode();

@Component({
  selector: 'my-app',
  providers: [APP_PROVIDERS],
  templateUrl: 'app/app.component.html'
})
export class AppComponent { 
  
}
