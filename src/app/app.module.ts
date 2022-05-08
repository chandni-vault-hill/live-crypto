import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CryptoSectionComponent } from './dashboard/dashboard.component';
import { AddCryptoComponent } from './add-crypto/add-crypto.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CryptoCardComponent,
    CryptoSectionComponent,
    AddCryptoComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
