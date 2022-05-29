import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { AseguradoComponent } from './asegurados/asegurado/asegurado.component';
import { AseguradosComponent } from './asegurados/asegurados.component';
import { BuscarComponent } from './buscar/buscar.component';
import { SeguroComponent } from './seguros/seguro/seguro.component';
import { SegurosComponent } from './seguros/seguros.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/seguros',
        pathMatch: 'full'
      },
      {
        path: 'seguros',
        component: SegurosComponent
      },
      {
        path: 'asegurados',
        component: AseguradosComponent
      },
      {
        path: 'asegurado/:id',
        component: AseguradoComponent
      },
      {
        path: 'seguro/:id',
        component: SeguroComponent
      },

      {
        path: 'buscar',
        component: BuscarComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
