import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CryptoModal, CryptoResponseModal } from '../modals/index';
import { CryptoService } from '../services/crypto.service';
import { LiveCryptoService } from '../services/live-crypto.service';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss'],
})
export class AddCryptoComponent implements OnInit {
  public selectedCurrency: CryptoModal;
  public showErrorMessage: string = '';

  constructor(
    private liveCryptoService: LiveCryptoService,
    private cryptoService: CryptoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showErrorMessage = '';
    this.getAllCryptoCurrencies();
  }

  public currencies: CryptoModal[] = [];

  getAllCryptoCurrencies() {
    this.liveCryptoService.getAllCurrencies();
    this.liveCryptoService.currencies$.subscribe(
      (currencies: CryptoResponseModal) => {
        Object.keys(currencies).map((key: string) => {
          this.currencies.push({
            name: key.toUpperCase(),
            value: `${currencies[key]} USD`,
          } as CryptoModal);
        });
      }
    );
  }

  saveSelection(): void {
    this.showErrorMessage = '';
    if (this.selectedCurrency) {
      let index = -1;
      this.cryptoService.currencies$.pipe(
        map((res: CryptoModal[]) => {
          index = res.findIndex((el) => {
            return el.name == this.selectedCurrency.name;
          });
        })
      );
      if (index === -1) {
        this.cryptoService.create(this.selectedCurrency);
        this.navigateToDashboard();
      } else {
        this.showErrorMessage = 'Currency exist in Dashboard';
      }
    } else {
      this.showErrorMessage = 'Please select currency';
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  onSelectionChange(value: any): void {
    this.selectedCurrency = value;
  }
}
