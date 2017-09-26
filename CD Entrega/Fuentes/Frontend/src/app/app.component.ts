import { Component, enableProdMode } from '@angular/core';
import { APP_PROVIDERS } from './app.providers';

enableProdMode();

@Component({
  selector: 'my-app',
  providers: [APP_PROVIDERS],
  templateUrl: 'app/app.component.html'
})
export class AppComponent { 
  
}
