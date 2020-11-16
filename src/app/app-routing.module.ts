import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitoretComponent } from './debitoret/debitoret.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';
import { MesuesitComponent } from './mesuesit/mesuesit.component';

const routes: Routes = [ { path: "debitoret", component: DebitoretComponent },{ path: "mesuesit", component: MesuesitComponent },
{
  path: "mesuesit/:$key",
  component: MesuesiLendaComponent,

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
