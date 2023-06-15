import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId: string;
  days: number = 30;
  currency: string = 'EUR';
  isLoadingDetails = false;
  isLoadingGraph = false;

  daysList = [1, 30, 90, 365];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#007bff',
        pointHoverBackgroundColor: '#007bff',
        pointHoverBorderColor: '#007bff',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => (this.coinId = val['id']));
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData();
    });
  }

  getCoinData() {
    this.isLoadingDetails = true;
    this.api.getCurrencyById(this.coinId).subscribe(
      (res) => {
        if (this.currency === 'USD') {
          res.market_data.current_price.eur = res.market_data.current_price.usd;
          res.market_data.market_cap.eur = res.market_data.market_cap.usd;
        }
        console.log(res);
        this.coinData = res;
        this.isLoadingDetails = false;
      },
      (error) => (this.isLoadingDetails = false)
    );
  }

  getGraphData(days: number) {
    this.isLoadingGraph = true;
    this.api
      .getGraphicalCurrencyData(this.coinId, this.currency, days)
      .subscribe(
        (res) => {
          setTimeout(() => {
            this.myLineChart.chart?.update();
          }, 200);
          this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
            return a[1];
          });
          this.lineChartData.labels = res.prices.map((a: any) => {
            let date = new Date(a[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                : `${date.getHours()} : ${date.getMinutes()} AM`;

            this.days = days;
            return days === 1 ? time : date.toLocaleDateString();
          });
          this.isLoadingGraph = false;
        },
        (error) => (this.isLoadingGraph = false)
      );
  }
}
