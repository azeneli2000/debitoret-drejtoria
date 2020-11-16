import { Component, OnInit, ViewChild } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
 
} from "@angular/material/table";
import { PrintService } from '../print.service';

import{MatButton} from '@angular/material/button'

@Component({
  selector: 'app-debitoret',
  templateUrl: './debitoret.component.html',
  styleUrls: ['./debitoret.component.css']
})
export class DebitoretComponent implements OnInit {
  nxenesitList: AngularFireList<any>; 
  constructor(private db: AngularFireDatabase,private printer : PrintService) { }
  mbeturShkolla: number = 0;
  mbeturTrans: number=0;
  mbeturLibra: number=0;
  mbeturUni: number=0;
  detyrimiMujorShkolla: number = 0;
  detyrimiMujorTransporti: number = 0;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "index",
    "Emri",
    "Atesia",
    "Mbiemri",
    "Klasa",
    "Indeksi",
   
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  mobile: boolean = false;
  checked = false;
  isLoading : boolean = true;
 vitiZgjedhur = "2020-2021"


  getAll() {
    this.isLoading = true;
    this.getNxenesit().subscribe((list) => {
      let array = list.map((item) => {
        this.isLoading = false;
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      //
      let array1 = array.filter(
        (item) =>
          item.$key !== "Eskursione" &&
          item.$key !== "Mesuesit" &&
          item.$key !== "Shpenzime" &&
          item.$key !== "Arketime"
      );
      this.listData = new MatTableDataSource(array1);
      // console.log(array1) ;

      if (this.listData.data.length == 0) this.isLoading = false;
      this.mbeturShkolla =
        this.listData.filteredData
          .map((t) => t.PagesaShkolla)
          .reduce((acc, value) => acc + value, 0) -
        this.listData.filteredData
          .map((t) => t.PaguarShkolla)
          .reduce((acc, value) => acc + value, 0);

      this.detyrimiMujorShkolla = 0;
      this.detyrimiMujorTransporti = 0;
      this.listData.filteredData.forEach((el) => {
        this.detyrimiMujorShkolla =
          this.detyrimiMujorShkolla +
          this.gjejVonesaSasia(el.PagesaShkolla, el.PaguarShkolla);
      });
      this.listData.sort = this.sort;
      if (!this.mobile) this.listData.paginator = this.paginator;
      //filtron vetem kolnat e visualizuara ne tabele pervec actions dhe $key
      this.listData.filterPredicate = (data, filter) => {
        // this.detyrimiMujorShkolla = 0;

        if (this.searchKey == "mujore" + data.Klasa) {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return (
            this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 1 &&
            data.Klasa == data.Klasa
          );
        }
        if (this.searchKey == "mujore") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 1;
        }

        if (this.searchKey == "vonesa" + data.Klasa) {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return (
            (this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 2 ||
              this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 1) &&
            data.Klasa == data.Klasa
          );
        }
        if (this.searchKey == "vonesa") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return (
            this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 2 ||
            this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 1
          );
        }
        if (this.searchKey == "prapambetur" + data.Klasa) {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return (
            this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 2 &&
            data.Klasa == data.Klasa
          );
        }
        if (this.searchKey == "prapambetur") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return this.gjejVonesaRe(data.PagesaShkolla, data.PaguarShkolla) == 2;
        }
        if (this.searchKey == "1") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return data.Klasa == 1;
        }
        if (this.searchKey == "0") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return data.Klasa == 0;
        }
        if (this.searchKey == "2") {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
          return data.Klasa == 2;
        }

        if (this.searchKey != "shkolla")
          return this.displayedColumns.some((ele) => {
            return (
              ele != "MbeturShkolla" &&
              ele != "DetyrimiShkolla" &&
              ele != "Actions" &&
              ele != "PagesaShkolla" &&
              ele != "PaguarShkolla" &&
              ele != "MbeturTransporti" &&
              ele != "DetyrimiTransporti" &&
              ele != "PagesaTransporti" &&
              ele != "PaguarTransporti" &&
              ele != "Indeksi" &&
              ele != "index" &&
              data[ele].toString().toLowerCase().indexOf(filter) != -1
            );
          });
      };
    });
  }

  
  applyFilter() {
    this.detyrimiMujorShkolla = 0;
    this.detyrimiMujorTransporti = 0;

    this.listData.filter = this.searchKey.trim().toLowerCase();

    this.mbeturShkolla =
      this.listData.filteredData
        .map((t) => t.PagesaShkolla)
        .reduce((acc, value) => acc + value, 0) -
      this.listData.filteredData
        .map((t) => t.PaguarShkolla)
        .reduce((acc, value) => acc + value, 0);

    this.listData.filteredData.forEach((el) => {
      this.detyrimiMujorShkolla =
        this.detyrimiMujorShkolla +
        this.gjejVonesaSasia(el.PagesaShkolla, el.PaguarShkolla);
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  gjejVonesaRe(pagesa, paguar) {
    let kesti = pagesa / 9;
    // console.log(kesti);
    let nrKesteshPaguar = Math.round(paguar / kesti);
    var currentdate = new Date();
    //  console.log('keste : ' + nrKesteshPaguar);
    let dateNow = new Date(
      currentdate.getFullYear(),
      currentdate.getMonth(),
      currentdate.getDate()
    );

    let dateFillimi = new Date("08/01/" + this.vitiZgjedhur.substring(0, 4));
    let muaj =
      dateNow.getMonth() -
      dateFillimi.getMonth() +
      12 * (dateNow.getFullYear() - dateFillimi.getFullYear());
    let totDetyrimi = 0;
    if (muaj <= 9) totDetyrimi = muaj * kesti;
    else totDetyrimi = 9 * kesti;
    let diferenca = totDetyrimi - paguar;
    if (diferenca > kesti) return 2;
    if (diferenca <= kesti && diferenca > 0) {
      //  debugger;
      return 1;
    }
    if (diferenca < 0) return 0;
    if (diferenca == 0) return 4;
  }

  gjejVonesaSasia(pagesa, paguar) {
    let kesti = pagesa / 9;
    // console.log(kesti);
    let nrKesteshPaguar = paguar / kesti;
    var currentdate = new Date();
    //  console.log('keste : ' + nrKesteshPaguar);
    let dateNow = new Date(
      currentdate.getFullYear(),
      currentdate.getMonth(),
      currentdate.getDate()
    );

    let dateFillimi = new Date("08/01/" + this.vitiZgjedhur.substring(0, 4));
    // console.log("data "  +  this.vitiZgjedhur.substring(0,4))
    let muaj =
      dateNow.getMonth() -
      dateFillimi.getMonth() +
      12 * (dateNow.getFullYear() - dateFillimi.getFullYear());
    // console.log(muaj);
    if (muaj > 9) muaj = 9;
    let res = muaj * kesti - nrKesteshPaguar * kesti;
    if (res >= 0 && !(pagesa == 0)) return res;
    else return 0;
  }


  
  printVonesa() {
    if (this.searchKey == "shkolla")
      this.printer.printVonesa(
        this.listData.filteredData,
        "VONESAT SHKOLLA KLASA "
      );

    if (this.searchKey == "transporti")
      this.printer.printVonesa(
        this.listData.filteredData,
        "VONESAT TRANSPORTI KLASA "
      );

    if (this.searchKey != "shkolla" && this.searchKey != "transporti")
      this.printer.printVonesa(this.listData.filteredData, "KLASA ");
  }

  ngOnInit(): void {
    this.getAll();
  }
  getNxenesit() {

    // let viti = localStorage.getItem("VitiShkollor");
    this.nxenesitList = this.db.list("2020-2021");
    console.log(this.nxenesitList.snapshotChanges());

    return this.nxenesitList.snapshotChanges();
   // return this.db.list(viti).snapshotChanges();
  }



  

}

