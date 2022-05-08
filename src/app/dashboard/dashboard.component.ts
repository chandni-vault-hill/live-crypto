import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoModal } from '../modals/index';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class CryptoSectionComponent implements OnInit {
  public currencies: CryptoModal[] = [];

  constructor(
    private cryptoService: CryptoService
  ) {
  }

  ngOnInit(): void {
    this.cryptoService.currencies$.subscribe(res => {
      this.currencies = res;
    });
  }
}
