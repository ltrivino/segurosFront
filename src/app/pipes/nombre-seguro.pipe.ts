import { Pipe, PipeTransform } from '@angular/core';
import { SegurosService } from '../services/seguros.service';

@Pipe({
  name: 'nombreSeguro'
})
export class NombreSeguroPipe implements PipeTransform {

  constructor(private segurosServices: SegurosService) {

  }

  transform(id: any): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {

      this.segurosServices.GetAll().subscribe(resp => {
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
