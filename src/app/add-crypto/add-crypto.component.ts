import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoModal, CryptoResponseModal } from '../modals/index';
import { CryptoService } from '../services/crypto.service';
import { LiveCryptoService } from '../services/live-crypto.service';

@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.scss'],
})
export class AddCryptoComponent implements OnInit {
  public selectedCurrency: CryptoModal | null = null;
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
    this.liveCryptoService
      .getAllCurrencies()
      .subscribe((currencies: CryptoResponseModal) => {
        this.currencies.push(...currencies.data);
      });
  }

  saveSelection(): void {
    this.showErrorMessage = '';
    if (this.selectedCurrency) {
      let tempObj: CryptoModal[] = [];
      this.cryptoService.currencies$.subscribe(res => {
        tempObj = res.filter( (el) => {
          return el.name == this.selectedCurrency?.name;
        });
      })
      if(tempObj.length === 0) {
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
