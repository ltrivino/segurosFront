import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Asegurados } from 'src/app/models/asegurados';
import { AseguradosSeguros } from 'src/app/models/AseguradoSeguros';
import { Seguros } from 'src/app/models/seguros';
import { AseguradosSegurosService } from 'src/app/services/asegurados-seguros.service';
import { AseguradosService } from 'src/app/services/asegurados.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-asegurado',
  templateUrl: './asegurado.component.html',
  styleUrls: ['./asegurado.component.scss']
})
export class AseguradoComponent implements OnInit {

  selectable = true;
  removable = true;

  nombre?: string;
  apellido?: string;
  cedula?: string;
  id: number = 0;

  seguros: Seguros[] = []
  seguroList: segurosList[] = [{ nombre: "" }]
  nombreSeguro: any;
  id_seguros: any[] = [];


  constructor(private segurosServices: SegurosService,
    private activateRouter: ActivatedRoute,
    private aseguradoServices: AseguradosService,
    private aseguradosSegurosServices: AseguradosSegurosService) { }

  asegurado: Asegurados | null = null

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
      this.getAseguradoId(this.id);
      this.getAllSeguros();
    })
  }

  getAseguradoId(id: number) {
    this.aseguradoServices.getById(id).subscribe(resp => {
      this.asegurado = resp
      this.nombre = this.asegurado.nombre
      this.apellido = this.asegurado.apellido
      this.cedula = this.asegurado.cedula
    })
  }

  getAllSeguros() {
    this.segurosServices.GetAll().subscribe(resp => {
      this.seguros = resp
    })
  }

  remove(segurosList: segurosList): void {
    const index = this.seguroList.indexOf(segurosList);

    if (index >= 0) {
      this.seguroList.splice(index, 1);
      this.id_seguros.splice(index, 1);
    }
  }

  GetIngredient(dato: any) {
    this.nombreSeguro = dato.nombre;
    let id_seguro = dato.id;

    this.add(this.nombreSeguro);
    this.id_seguros.push(id_seguro);
  }

  add(value: any): void {
    if (value) {
      this.seguroList.push({ nombre: value });
    }
  }

  guardar() {
    console.log(this.id_seguros);

    let listAseguradoSeguros: AseguradosSeguros[] = []

    this.id_seguros.forEach(element => {
      const aseguradoSeguro: AseguradosSeguros = {
        aseguradosId: parseInt(this.id.toString()),
        segurosId: element
      }
      listAseguradoSeguros.push(aseguradoSeguro);
    });

    this.aseguradosSegurosServices.crear(listAseguradoSeguros).subscribe(resp=> {
      
    })

  }

}

export interface segurosList {
  nombre: string;
}
