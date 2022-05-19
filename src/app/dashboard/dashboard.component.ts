import { Component, OnInit } from '@angular/core';
import { CryptoModal } from '../modals/index';
import { CryptoService } from '../services/crypto.service';
import { LiveCryptoService } from '../services/live-crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class CryptoSectionComponent implements OnInit {
  public currencies: CryptoModal[];

  constructor(
    private cryptoService: CryptoService,
    private livecryptoService: LiveCryptoService,
  ) {
  }

  ngOnInit(): void {
    this.cryptoService.currencies$.subscribe(res => {
      this.currencies = res;
      if(this.currencies.length > 0) {
        this.livecryptoService.getSelectedCurrencies();
        this.livecryptoService.selectedCurrencies$.subscribe(data => {
          this.currencies = data;
        });
      }
    });
  }
}
