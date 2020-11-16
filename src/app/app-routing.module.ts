import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitoretComponent } from './debitoret/debitoret.component';
import { MesuesitComponent } from './mesuesit/mesuesit.component';

const routes: Routes = [ { path: "debitoret", component: DebitoretComponent },{ path: "mesuesit", component: MesuesitComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
