import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradosSeguros } from 'src/app/models/AseguradoSeguros';
import { Seguros } from 'src/app/models/seguros';
import { AseguradosSegurosService } from 'src/app/services/asegurados-seguros.service';
import { AseguradosService } from 'src/app/services/asegurados.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  seguros: Seguros[] = []

  aseguradoSeguro : AseguradosSeguros[] = []

  dataSource: MatTableDataSource<AseguradosSeguros>;

  displayedColumns: string[] = [
    'id',
    'aseguradosId',
    'segurosId',
  ];

  constructor(private segurosServices: SegurosService,
    private aseguradoServices: AseguradosService,
    private aseguradoSeguroServices: AseguradosSegurosService) {
      this.dataSource = new MatTableDataSource(this.aseguradoSeguro);
     }

  ngOnInit(): void {
    this.getAllSeguros();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getAllSeguros() {
    this.segurosServices.GetAll().subscribe(resp => {
      this.seguros = resp
    })
  }

  GetAseguradosbySeguro(id:any){
  this.aseguradoSeguroServices.getAsuguradosByIdSeguro(id).subscribe(resp =>{
    this.dataSource = new MatTableDataSource(resp)
  })

  }

}
