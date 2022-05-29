import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AseguradosSeguros } from '../models/AseguradoSeguros';

@Injectable({
  providedIn: 'root'
})
export class AseguradosSegurosService {

  private apiUrl = `${environment.API_URL}/api/aseguradosSeguros`;

  constructor(private http: HttpClient) { }

  getAsuguradosByIdSeguro(id: number)//select by id
  {
    return this.http.get<AseguradosSeguros[]>(`${this.apiUrl}/asegurados-seguros/${id}`);
  }

  getSegurosByIdAsegurado(id: number)//select by id
  {
    return this.http.get<AseguradosSeguros[]>(`${this.apiUrl}/seguros-asegurados/${id}`);
  }

  crear(aseguradosSeguros: any) {
    return this.http.post(this.apiUrl, aseguradosSeguros);
  }
}
