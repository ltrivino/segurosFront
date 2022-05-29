import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Seguros } from 'src/app/models/seguros';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.scss']
})
export class SeguroComponent implements OnInit {

  seguro: Seguros | null = null
  form: FormGroup;

  nombre: string = ""
  prima: number = 0
  suma_asegurada: number = 0
  id: number | 0 = 0;

  constructor(private fb: FormBuilder,
    private segurosServices: SegurosService,
    private activateRouter: ActivatedRoute,
    private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      prima: ['', Validators.required],
      suma_asegurada: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSeguroId(this.id);
    })
  }

  getSeguroId(id: number) {
    this.segurosServices.getById(id).subscribe(resp => {
      this.seguro = resp
      this.nombre = this.seguro.nombre
      this.prima = this.seguro.prima
      this.suma_asegurada = this.seguro.suma_asegurada
    })
  }

  UpdateDatos() {
    if (this.form.invalid) {
      return;
    }

    const seguro: Seguros = {
      nombre: this.form.value.nombre,
      prima: this.form.value.prima,
      suma_asegurada: this.form.value.suma_asegurada,
    }
    this.segurosServices.Update(seguro, this.id).subscribe(resp => {
      this.router.navigateByUrl('/seguros');
    })
  }

}
