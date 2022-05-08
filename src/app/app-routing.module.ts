import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCryptoComponent } from './add-crypto/add-crypto.component';
import { CryptoSectionComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: CryptoSectionComponent },
  { path: 'add', component: AddCryptoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
