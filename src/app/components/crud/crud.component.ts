import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Personas } from 'src/app/core/model/Personas.model';
import { ApiPersonasService } from 'src/app/core/services/api-personas.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit, OnDestroy {

  // Variables para el formulario
  name: FormControl = new FormControl('', Validators.required);
  id: FormControl = new FormControl('', Validators.required);
  birthday: FormControl = new FormControl('', Validators.required);
  phone: FormControl = new FormControl('');
  email: FormControl = new FormControl('');
  formularioPersonas: FormGroup = new FormGroup({
    name: this.name,
    id: this.id,
    birthday: this.birthday,
    phone: this.phone,
    email: this.email
  });
  contexto: String = 'Create';

  // Variables para la tabla
  personas: Array<Personas> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private ApiPersonas: ApiPersonasService) { }

  ngOnInit(): void {

    // Primera carga de datos en la tabla
    this.fetchData();

  }

  fetchData(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      data: this.personas,
      language: {
        search: 'Buscar'
      },
      ajax: (dataParams: any, callback) => {
        this.ApiPersonas.getListaPersonas().subscribe(
          result => {
            this.personas = result.data;
          },
          err => {
            console.log('Error al leer api');
          }
        );
        callback({
          data: [],
        });
      },
      columns: [
        {
          data: 'name',
        },
        {
          data: 'id',
        },
        {
          data: 'birthday',
        },
        {
          data: 'phone',
        },
        {
          data: 'email',
        },
      ],
      paging: false,
      info: false
    };
  }

  save(){
    let phone = this.phone.value == '' ? 'NoPhone': 'phone';
    let email = this.email.value == '' ? 'NoEmail': 'email';
    let body: Object = {
      name: this.name.value,
      id: this.id.value,
      birthday: this.birthday.value,
      [phone]: this.phone.value,
      [email]: this.email.value
    }

    this.ApiPersonas.savePersona(body).subscribe(
      result => {
        alert(Object.values(result));
      },
      err => {
        alert(err);
      }
    );

    this.formularioPersonas.reset();
    this.reload();
  }

  update(){
    let phone = this.phone.value == '' ? 'NoPhone': 'phone';
    let email = this.email.value == '' ? 'NoEmail': 'email';
    let body: Object = {
      name: this.name.value,
      id: this.id.value,
      birthday: this.birthday.value,
      [phone]: this.phone.value,
      [email]: this.email.value
    }

    this.ApiPersonas.updatePersona(body).subscribe(
      result => {
        alert(Object.values(result));
      },
      err => {
        alert(err);
      }
    );

    this.formularioPersonas.reset();
    this.contexto = 'Create';
    this.reload();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  eliminarPersona(id: Number){
    this.ApiPersonas.deletePersona(id).subscribe(
      result => {
        alert(result);// true || false
      },
      err => {
        alert(err);
      }
    );
    this.reload();
  }

  editarPersona(id: Number){
    this.ApiPersonas.getPersona(id).subscribe(
      result => {
        this.name.setValue(result.name);
        this.id.setValue(result.id);
        this.birthday.setValue(String(result.birthday).split('T')[0]);
        this.phone.setValue(result.phone);
        this.email.setValue(result.email);
        this.contexto = 'Update'
      }
    );
  }

  reload(){
    window.location.reload();
  }
}
