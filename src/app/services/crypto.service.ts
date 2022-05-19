import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CryptoModal } from '../modals';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private _currencies = new BehaviorSubject<CryptoModal[]>([]);
  readonly currencies$ = this._currencies.asObservable();

  private currencies: CryptoModal[] = [];

  constructor() {}

  create(item: CryptoModal) {
    this.currencies.push(item);
    this._currencies.next(this.currencies);
  }

  remove(item: CryptoModal) {
    this.currencies.forEach((value, index) => {
      if (value.name == item.name) {
        this.currencies.splice(index, 1);
      }
    });

    this._currencies.next(this.currencies);
  }
}
