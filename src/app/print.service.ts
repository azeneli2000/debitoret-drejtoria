import { Injectable } from '@angular/core';

import { Observable,from } from 'rxjs';
 import { map } from 'rxjs/operators';
//  import * as shajs from 'angular-sha';
//  import {Sha256} from 'sha256';

//  import * as RSVP from 'rsvp';
//  import * as qz from 'qz-tray';

// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// declare var qz: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

 






  








printMesuesit(filterdData)
{
 
  var currentdate = new Date(); 
var datetime = "Data : " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  let dataOra = "<div>" +  datetime  +   "<h3 align='center' >MESUESIT</h3></div>  </br>"
 
  let printContentTbl ="";
  let  printContentHeaders = "<div class = 'tbl'><table style='width:90%'> <th>Nr</th> <th>Emri</th><th>Mbiemri</th><th>Kategoria</th><th>Vjetersia</th>";
  let style  = "</table></div><style> table, th, td {border: 1px solid black;border-collapse: collapse;} th,td {text-align: center;}</style>";
 let j = 0;
  filterdData.forEach(element => {
j = j+1;
 
   printContentTbl =printContentTbl + "<tr> <td>"+j + "</td> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Mbiemri"] + "</td> <td>" + element["Kategoria"] + "</td>"+"<td>" + element["Vjetersia"] + "</td>"
  +"</tr>" ; 
});
    let html = dataOra + printContentHeaders + printContentTbl + style;
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(html);
    WindowPrt.document.close(); 
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();

  
  
}






  printVonesa(filterdData,lloji)
  {

    let html ="";
    for (var i =0;i<=12;i++)
    {
    var   printerData = filterdData.filter(element => {
         return (element.Klasa==i)

      });
      // console.log(printerData);

    

  
    var currentdate = new Date(); 
  var datetime = "Data : " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + "  "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
    let dataOra = "<div>" +  datetime  +   "<h3 align='center' >" + lloji + i +"</h3></div>  </br>"
   
   
   if(printerData.length>0)
   {
     //console.log(printerData);
    let printContentTbl ="";
    let  printContentHeaders = "<div class = 'tbl'><table style='width:90%'> <th>Nr</th><th>Emri</th><th>Mbiemri</th><th>Klasa</th><th>Indeksi</th>";
     let j= 0;
    printerData.forEach(element => {
  
    j=j+1;
    // if(element.PagesaTransporti !=0 && element.PagesaShkolla!=0)
     printContentTbl =printContentTbl + "<tr> <td>"+j + "</td> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Mbiemri"] + "</td> <td>" + element["Klasa"] + "</td>"+"<td>" + element["Indeksi"] + "</td>"
    +"</tr>" ; 
  });
     html = html +"</table></div><footer></footer>"+  dataOra + printContentHeaders + printContentTbl ;
}
} 

      let style  = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;} th,td {text-align: center;} footer {page-break-after: always;}</style>";
      html = html + style;
      html = html.substring(31);
      // console.log(html);
      const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(html);
      WindowPrt.document.close(); 
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    
    
  }

}


