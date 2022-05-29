import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Seguros } from 'src/app/models/seguros';
import { SegurosService } from 'src/app/services/seguros.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.scss']
})
export class SegurosComponent implements OnInit {

  seguros: Seguros[] = []

  dataSource: MatTableDataSource<Seguros>;

  seguro: Seguros | undefined

  displayedColumns: string[] = [
    'id',
    'nombre',
    'prima',
    'suma_asegurada',
    'Action'
  ];

  nombre: string = ""
  prima: number = 0
  suma_asegurada: number = 0

  form: FormGroup;
  constructor(private fb: FormBuilder, private segurosServices: SegurosService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      prima: ['', Validators.required],
      suma_asegurada: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource(this.seguros);
  }

  ngOnInit(): void {
    this.getAllSeguros()
  }

  getAllSeguros() {
    this.segurosServices.GetAll().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp)
    })
  }

  GuardarDatos() {

    const seguro: Seguros = {
      nombre: this.nombre,
      prima: parseInt(this.prima.toString()),
      suma_asegurada: parseInt(this.suma_asegurada.toString()),
    }
    this.segurosServices.crear(seguro).subscribe(resp => {
      this.ngOnInit();
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ConfirmarDelete(id: number) {
    Swal.fire({
      title: '<h3>Esta seguro que desea eliminar la Cita?</h3>',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#48BAB9',
      denyButtonColor: '#F4991F',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRegistro(id);
        this.ngOnInit();
      } else if (result.isDenied) {
        this.ngOnInit();
      }
    });
  }

  deleteRegistro(id: number) {
    this.segurosServices.delete(id).subscribe((resp) => {
      this.ngOnInit();
    }, error => {
      alert(error)
    });
  }

}
