import { Injectable } from '@angular/core';
import { CryptoModal, CryptoResponseModal } from '../modals/index';
import { map, Subject } from 'rxjs';
import { CryptoService } from './crypto.service';

export const WS_ENDPOINT = 'wss://ws.coincap.io/prices?assets=ALL';
export const WS_ENDPOINT_SELECTED_ASSETS = 'wss://ws.coincap.io/prices?assets=';

@Injectable({
  providedIn: 'root',
})
export class LiveCryptoService {
  public currencies$: Subject<CryptoModal[]> = new Subject<CryptoModal[]>();
  webSocket: WebSocket;

  constructor(private cryptoService: CryptoService) {}

  connect(url: string): void {
    this.webSocket = new WebSocket(url);
    this.webSocket.onopen = (event: any) => {
      console.log('connected ::' + event);
    };
    this.webSocket.onerror = (event: any) => {
      console.log(`${JSON.stringify(event.data)} -> Error in websocket.`);
    };
    this.webSocket.onclose = (event: any) => {
      console.log(`${JSON.stringify(event.data)} -> Socket closed.`);
    };
  }

  getAllCurrencies(): void {
    this.connect(WS_ENDPOINT);
    let allCurrencies: CryptoModal[] = [];
    this.webSocket.onmessage = (event: any) => {
      let data = JSON.parse(event.data) as CryptoResponseModal;
      Object.keys(data).map((key: string) => {
        allCurrencies.push({
          name: key.toUpperCase(),
          value: `${data[key]} USD`,
        } as CryptoModal);
      });
      this.currencies$.next(allCurrencies);
    };
  }

  processData(data: CryptoResponseModal) {
    this.cryptoService.currencies$.pipe(
      map((dataObj) => {
        Object.keys(data).map((key: string) => {
          let index = dataObj.findIndex((value) => value.name.toLowerCase() === key);
          if(index !== -1) {
            dataObj[index] = {
              name: key.toUpperCase(),
              value: `${data[key]} USD`,
            } as CryptoModal;
          }
        });
        debugger;
        this.currencies$.next(dataObj);
      })
    ).subscribe();
  }

  getSelectedCurrencies(cryptos: string): void {
    this.connect(WS_ENDPOINT_SELECTED_ASSETS + cryptos);
    this.webSocket.onmessage = (event: any) => {
      this.processData(JSON.parse(event.data) as CryptoResponseModal);
    };
  }

  closeConnection() {
    this.webSocket
    .close();
  }
}
