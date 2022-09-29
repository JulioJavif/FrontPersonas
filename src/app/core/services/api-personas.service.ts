import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personas } from '../model/Personas.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPersonasService {

  personas: Personas [] = [];

  constructor(private http: HttpClient) { }

  public getListaPersonas(){
    this.http.get<any>('http://localhost:8080/persona').subscribe(
      result => {
        this.personas = result.data;
      },
      err => {
        console.log('Error al leer api');
      }
    );
    return this.personas;
  }
}
