import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-header',
  templateUrl: './coin-header.component.html',
  styleUrls: ['./coin-header.component.scss'],
})
export class CoinHeaderComponent implements OnInit {
  currency: string = 'EUR';
  bannerData: any = [];

  constructor(
    private currencyService: CurrencyService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getBannerData();
    });
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
    });
  }
}
