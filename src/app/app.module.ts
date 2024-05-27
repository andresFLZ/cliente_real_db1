import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpleadosService } from './services/empleados.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequerimientosAsistenteComponent } from './components/requerimientos-asistente/requerimientos-asistente.component';
import { CargosService } from './services/cargos.service';
import { RequerimientosService } from './services/requerimientos.service';
import { PerfilesService } from './services/perfiles.service';
import { ProcesosRequerimientosService } from './services/procesosRequerimiento.service';
import { FasesService } from './services/fases.service';
import { HVService } from './services/hv.service';
import { TipoItemPerfilService } from './services/tipoItemPerfil.service';
import { InstitucionService } from './services/institucion.service';
import { ProcesosCandidatosService } from './services/procesosCandidatos.service';
import { PruebasService } from './services/pruebas.service';
import { PruebasCandidatoService } from './services/pruebasCandidato.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RequerimientosAsistenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EmpleadosService,
    CargosService,
    RequerimientosService,
    PerfilesService,
    ProcesosRequerimientosService,
    PerfilesService,
    FasesService,
    HVService,
    TipoItemPerfilService,
    InstitucionService,
    ProcesosCandidatosService,
    PruebasService,
    PruebasCandidatoService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
