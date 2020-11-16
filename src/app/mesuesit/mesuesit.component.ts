import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MesuesiZgjedhurService } from '../mesuesi-zgjedhur.service';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-mesuesit',
  templateUrl: './mesuesit.component.html',
  styleUrls: ['./mesuesit.component.css']
})
export class MesuesitComponent implements OnInit {

  constructor(private db : AngularFireDatabase,private printer : PrintService,private mesZgjedhur : MesuesiZgjedhurService,private router : Router) { }
  isLoading = true;
  vitiZgjedhur;
  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Emri','Mbiemri','Vjetersia','Kategoria','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  searchKey :string;

  ngOnInit(): void {
   this.getAll();
  }

  getMesuesit() {
    // this.listData = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit').snapshotChanges();
    // return this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit').snapshotChanges();
    return this.db.list(('2020-2021') +'/Mesuesit').snapshotChanges();

  }

  getAll()
  {
    this.isLoading = true;

    this.getMesuesit().subscribe(
      list => {
        let array = list.map(item =>{
          this.isLoading = false;
          return {
            $key : item.key,
            ...item.payload.val() as {}};
        }

        );
        this.listData= new MatTableDataSource(array);
        if(this.listData.data.length==0)
        this.isLoading = false;
        this.listData.sort = this.sort;
        //filtron vetem kolnat e visualizuara ne tabele 
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'Actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSelect(mesuesi){
    this.mesZgjedhur.mesuesiZgjedhur=mesuesi;
   
    this.mesZgjedhur.mesuesiZgjedhurPaga = mesuesi.Paga;
    this.mesZgjedhur.mesuesiZgjedhurId = mesuesi.$key;
    
    
     this.router.navigate(['/mesuesit',mesuesi.$key]);
   
   }
   printMesuesit()
   {
 
     this.printer.printMesuesit(this.listData.filteredData);
   }
 
}
