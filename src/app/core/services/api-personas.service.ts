import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTablesResponse } from '../model/DataTablesResponse';
import { Personas } from '../model/Personas.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPersonasService {

  personas: Personas [] = [];

  constructor(private http: HttpClient) { }

  public getListaPersonas(){
    return this.http.get<DataTablesResponse>('http://localhost:8080/persona');
  }

  public savePersona(body: any){
    let response: any;
    return this.http.post<any>('http://localhost:8080/persona', body);
  }

  public deletePersona(id: Number){
    return this.http.delete<any>('http://localhost:8080/persona/'+id);
  }

  public getPersona(id: Number){
    return this.http.get<Personas>('http://localhost:8080/persona/'+id);
  }

  updatePersona(body: any){
    return this.http.put<any>('http://localhost:8080/persona', body);
  }
}
