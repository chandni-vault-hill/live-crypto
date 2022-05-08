import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoModal } from '../modals';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss'],
})
export class CryptoCardComponent implements OnInit {
  @Input() data: CryptoModal | undefined;

  constructor(private router: Router, private cryptoService: CryptoService) {}

  ngOnInit(): void {}

  removeSelection(value: CryptoModal | undefined): void {
    if (value) {
      this.cryptoService.remove(value);
    }
  }
}
