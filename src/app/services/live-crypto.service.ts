import { Injectable } from '@angular/core';
import { CryptoModal } from '../modals/index';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { cryptoApiUrl } from '../constants';
import { CryptoResponseModal } from '../modals/CryptoModal';
@Injectable({
  providedIn: 'root'
})
export class LiveCryptoService {
  private readonly _cryptoData: BehaviorSubject<CryptoModal[]> = new BehaviorSubject<CryptoModal[]>([]);
  public cryptoData$: Observable<CryptoModal[]> = this._cryptoData.asObservable()

  constructor(private http: HttpClient) { }

  get cryptoData(): CryptoModal[] {
    return this._cryptoData.getValue();
  }

  set cryptoData(list: CryptoModal[]) {
    this._cryptoData.next(list);
  }

  getAllCurrencies(): Observable<CryptoResponseModal> {
    return this.http.get<CryptoResponseModal>(cryptoApiUrl)
      .pipe(
        catchError(this.handleError<CryptoResponseModal>('getAllCurrencies', {} as CryptoResponseModal))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T);
    };
  }
}
