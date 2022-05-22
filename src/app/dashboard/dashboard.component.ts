import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { CryptoModal } from '../modals/index';
import { CryptoService } from '../services/crypto.service';
import { LiveCryptoService } from '../services/live-crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class CryptoSectionComponent implements OnInit {
  public currencies: CryptoModal[] = [];
  cryptoSubscription: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private livecryptoService: LiveCryptoService
  ) {}

  ngOnInit(): void {
    this.cryptoService.currencies$.pipe(
      tap((data) => (this.currencies = data))
    ).subscribe();
    if (this.currencies.length > 0) {
      let cryptos: string = this.currencies.map((e) => e.name.toLowerCase()).join(',');
      this.livecryptoService.getSelectedCurrencies(cryptos);
      this.cryptoSubscription = this.livecryptoService.currencies$.pipe(
        tap((data) => (this.currencies = data))
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.cryptoSubscription.unsubscribe();
    this.livecryptoService.closeConnection();
  }
}
