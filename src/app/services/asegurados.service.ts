import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asegurados } from '../models/asegurados';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {


  private apiUrl = `${environment.API_URL}/api/asegurados`;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Asegurados[]>(this.apiUrl);
  }

  getById(id: number)//select by id
  {
    return this.http.get<Asegurados>(`${this.apiUrl}/${id}`);
  }


  crear(asegurados: any) {
    return this.http.post(this.apiUrl, asegurados);
  }
}
