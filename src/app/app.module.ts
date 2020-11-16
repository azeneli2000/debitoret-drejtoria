import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebitoretComponent } from './debitoret/debitoret.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { environment } from '../environments/environment';
import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import{MatTableModule} from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import {  MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MesuesitComponent } from './mesuesit/mesuesit.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';






@NgModule({
  declarations: [
    AppComponent,
    DebitoretComponent,
    ToolbarComponent,
    MesuesitComponent,
    MesuesiLendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
     MatFormFieldModule,
     MatCardModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
