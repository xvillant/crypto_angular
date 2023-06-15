import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crypto-status';

  selectedCurrency: string = 'EUR';

  constructor(private currencyService: CurrencyService) {}

  sendCurrency(event: string) {
    this.currencyService.setCurrency(event);
  }
}
