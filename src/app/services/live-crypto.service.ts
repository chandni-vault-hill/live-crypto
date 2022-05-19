import { Injectable } from '@angular/core';
import { CryptoModal, CryptoResponseModal } from '../modals/index';
import { map, Subject } from 'rxjs';
import { CryptoService } from './crypto.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export const WS_ENDPOINT = 'wss://ws.coincap.io/prices?assets=ALL';
export const WS_ENDPOINT_SELECTED_ASSETS = 'wss://ws.coincap.io/prices?assets=';

@Injectable({
  providedIn: 'root',
})
export class LiveCryptoService {
  public currencies$: Subject<CryptoResponseModal> =
    new Subject<CryptoResponseModal>();
  public selectedCurrencies$: Subject<CryptoModal[]> = new Subject<
    CryptoModal[]
  >();
  private socket: WebSocketSubject<unknown>;

  constructor(private cryptoService: CryptoService) {}

  getAllCurrencies() {
    this.socket = webSocket(WS_ENDPOINT);
    this.socket.subscribe((response) => {
      let data: CryptoResponseModal = response as CryptoResponseModal;
      this.currencies$.next(data);
    });
  }

  processData(response: unknown) {
    let selectedCurrencies: CryptoModal[] = [];
    let data: CryptoResponseModal = response as CryptoResponseModal;
    Object.keys(data).map((key: string) => {
      selectedCurrencies.push({
        name: key.toUpperCase(),
        value: `${data[key]} USD`,
      } as CryptoModal);
    });

    this.selectedCurrencies$.next(selectedCurrencies);
  }

  getSelectedCurrencies(): void {
    let cryptos: string = '';
    this.cryptoService.currencies$.subscribe((res: CryptoModal[]) => {
      cryptos = res.map((e) => e.name).join(',');
    });
    const pricesWs = new WebSocket(WS_ENDPOINT_SELECTED_ASSETS + cryptos)
    pricesWs.onmessage = (msg) => {
      this.processData(msg.data)
    }
  }
}
