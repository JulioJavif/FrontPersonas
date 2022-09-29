import { Component, OnDestroy, OnInit } from '@angular/core';
import { Personas } from 'src/app/core/model/Personas.model';
import { Subject } from 'rxjs';
import { ApiPersonasService } from 'src/app/core/services/api-personas.service';

import 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from 'src/app/core/model/DataTablesResponse';


@Component({
  selector: 'app-peoplelist',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit, OnDestroy{

  personas: Personas[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private ApiService: ApiPersonasService, private http: HttpClient) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      ajax: (dataParams: any, callback) => {
        this.http
        .get<DataTablesResponse>('http://localhost:8080/persona')
        .subscribe(res => {
          this.personas = res.data;

          callback({
            data: [],
          });
        });
      },
      columns: [ {data: 'name'}, {data: 'id'},{data: 'birthday'},{data: 'phone'},{data: 'email'}, ],
      paging: false
    };
  }

  // url: 'http://localhost:8080/persona',
  //       type: 'GET',
  //       dataType: 'json',

  // (dataTablesParameters: any, callback) => {
  //   this.http
  //   .get<DataTablesResponse>('http://localhost:8080/persona')
  //   .subscribe(
  //     res => {
  //       this.personas = res.data;
  //       console.log(this.personas);
  //       callback({
  //         data: this.personas
  //       });
  //     }
  //   );
  // }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }

  eliminarPersona(id: Number){
    this.ngOnInit();
  }

  editarPersona(id: Number){

  }

}
