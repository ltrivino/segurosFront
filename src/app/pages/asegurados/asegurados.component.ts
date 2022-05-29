import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from "papaparse"
import { Asegurados } from 'src/app/models/asegurados';
import { AseguradosService } from 'src/app/services/asegurados.service';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.scss']
})
export class AseguradosComponent implements OnInit {

  asegurados: Asegurados[] = []

  dataSource: MatTableDataSource<Asegurados>;
  file: any;
  data: any;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'cedula',
    'edad',
    'Action'
  ];

  constructor(private aseguradoService: AseguradosService) {
    this.dataSource = new MatTableDataSource(this.asegurados);
  }

  ngOnInit(): void {
    this.getAllAsegurados()
  }

  cargar() {

    let delimiter: string = '|'
    let skipEmptyLines: boolean = true
    console.log(this.data);

    const parsed = parse(this.data, { delimiter, skipEmptyLines })

    let aseguradosData = parsed.data
    let body = JSON.stringify(this.convertParseToList(aseguradosData))
    console.log(JSON.parse(body));


    this.aseguradoService.crear(JSON.parse(body)).subscribe(resp => {
      this.ngOnInit();
    })


  }

  async onFileSelect(event: any) {
    this.file = event.target.files[0];
    if (!this.file) {
      return;
    }
    const reader = new FileReader()
    reader.onload = () => {
      this.data = reader.result
    }
    reader.readAsText(this.file);
  }

  ver(data: string) {
    console.log(data);
  }

  convertParseToList(parseData: any) {
    const parseDataToList: Array<Asegurados> = []
    try {
      parseData.map((row: any) => {
        let asegurado: Asegurados = {
          nombre: '',
          apellido: '',
          cedula: '',
          telefono: '',
          edad: 0
        }
        asegurado.nombre = row[0]
        asegurado.apellido = row[1]
        asegurado.cedula = row[2]
        asegurado.telefono = row[3]
        asegurado.edad = parseInt(row[4])

        parseDataToList.push(asegurado);

      })

      return parseDataToList;

    } catch (error) {

      return error

    }
  }

  getAllAsegurados() {
    this.aseguradoService.GetAll().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ConfirmarDelete(id: number) {

  }
}
