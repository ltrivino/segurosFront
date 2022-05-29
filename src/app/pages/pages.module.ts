import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AseguradosComponent } from './asegurados/asegurados.component';
import { SegurosComponent } from './seguros/seguros.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AseguradoComponent } from './asegurados/asegurado/asegurado.component';
import { SeguroComponent } from './seguros/seguro/seguro.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { BuscarComponent } from './buscar/buscar.component';
import { NombreSeguroPipe } from '../pipes/nombre-seguro.pipe';
import { NombreAseguradoPipe } from '../pipes/nombre-asegurado.pipe';


@NgModule({
  declarations: [
    AseguradosComponent,
    SegurosComponent,
    AseguradoComponent,
    SeguroComponent,
    BuscarComponent,
    NombreSeguroPipe,
    NombreAseguradoPipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class PagesModule { }
