import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './components/home/home.component';
import { PeoplelistComponent } from './components/peoplelist/peoplelist.component';
import { FormComponent } from './components/form/form.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiPersonasService } from './core/services/api-personas.service';
import { ContextService } from './core/services/context.service';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeoplelistComponent,
    FormComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ApiPersonasService,
    ContextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
