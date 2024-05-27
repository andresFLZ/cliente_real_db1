import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequerimientosAsistenteComponent } from './components/requerimientos-asistente/requerimientos-asistente.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "requerimientos/:correo",
    component: RequerimientosAsistenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
