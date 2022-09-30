import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Personas } from 'src/app/core/model/Personas.model';
import { ApiPersonasService } from 'src/app/core/services/api-personas.service';
import Swal from 'sweetalert2';

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
  dtTrigger = new Subject();
  // dtTrigger: Subject<any> = new Subject<any>();

  constructor(private ApiPersonas: ApiPersonasService) { }

  ngOnInit(): void {

    // Primera carga de datos en la tabla
    this.fetchData();

  }

  fetchData(){
    this.ApiPersonas.getListaPersonas().subscribe(
      result => {
        this.personas = result.data;
        this.dtTrigger.next(3);
        this.dtOptions = {
          paging: false,
          language: {
            url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-CO.json'
          }
        };
      },
      err => {
      },
      () => {
      }
    );
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
        if (result?.id) {
          Swal.fire('Guardado', 'Se guardó la persona', 'success');
        } else {
          Swal.fire('Error', 'No se pudo guardar la persona', 'warning');
        }
      },
      err => {
        Swal.fire('Error', 'Error al intentar guardar persona', 'error');
      }
    );

    setTimeout(() => {
      this.formularioPersonas.reset();
      this.reload();
    }, 400);
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
        if (result?.id) {
          Swal.fire('Guardado', 'Se guardó la persona', 'success');
        } else {
          Swal.fire('Error', 'No se pudo guardar la persona', 'warning');
        }
      },
      err => {
        Swal.fire('Error', 'Error al intentar guardar persona', 'error');
      }
    );

    setTimeout(() => {
      this.formularioPersonas.reset();
      this.contexto = 'Create';
      this.reload();
    }, 400);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  eliminarPersona(id: Number){
    this.ApiPersonas.deletePersona(id).subscribe(
      result => {
        if (result) {
          Swal.fire('Eliminado', 'Se ha eliminado una persona', 'success');
        } else {
          Swal.fire('No eliminado', 'No se pudo eliminar a la persona', 'warning');
        }
      },
      err => {
        Swal.fire('Error', 'Ha ocurrido un error al eliminar', 'error');
      }
    );

    setTimeout(() => {
      this.reload();
    }, 400);
  }

  editarPersona(id: Number){
    this.formularioPersonas.reset();
    this.contexto = 'Update';
    this.ApiPersonas.getPersona(id).subscribe(
      result => {
        this.name.setValue(result.name.trim());
        this.id.setValue(result.id);
        this.birthday.setValue(String(result.birthday).split('T')[0]);
        this.phone.setValue(result.phone.trim());
        this.email.setValue(result.email.trim());
        this.id.disable();
      }
    );
  }

  reload(){
    window.location.reload();
  }
}
