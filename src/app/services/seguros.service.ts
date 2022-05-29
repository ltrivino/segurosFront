import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seguros } from '../models/seguros';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {

  private apiUrl = `${environment.API_URL}/api/seguros`;

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Seguros[]>(this.apiUrl);
  }

  getById(id: number)//select by id
  {
    return this.http.get<Seguros>(`${this.apiUrl}/${id}`);
  }

  crear(seguros: any) {
    return this.http.post(this.apiUrl, seguros);
  }

  Update(seguro: any, id: number) {
    return this.http.put(`${this.apiUrl}/${id}`, seguro);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
