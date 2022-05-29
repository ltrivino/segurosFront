import { Pipe, PipeTransform } from '@angular/core';
import { AseguradosService } from '../services/asegurados.service';

@Pipe({
  name: 'nombreAsegurado'
})
export class NombreAseguradoPipe implements PipeTransform {

  constructor(private aseguradoService: AseguradosService) {

  }

  transform(id: any): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {

      this.aseguradoService.GetAll().subscribe(resp => {
        if (resp) {
          let seguro = resp
          for (let index = 0; index < seguro.length; index++) {
            if (seguro[index].id == id) {
              /*    console.log("zone category ", category[index].id, "id ", id); */
              resolve(seguro[index].nombre)
            }
          }
        }
      })
    })
    return promise
  }

}
