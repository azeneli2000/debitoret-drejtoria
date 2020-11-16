import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MesuesiZgjedhurService {

  constructor(private db : AngularFireDatabase) { }
  mesuesiZgjedhur  =[];
  mesuesiZgjedhurId;
  mesuesiZgjedhurPaga;
mz;
  
 

mbushMesuesin(){
  this.mz= this.db.list(('2020-2021') +'/Mesuesit/'+this.mesuesiZgjedhurId).valueChanges();
}
}
