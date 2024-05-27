import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequerimientosService {

    URI = 'http://localhost:4000/requerimientos'

    constructor(private http: HttpClient) { }

    getRequerimientosEmpleadoCliente(cod_empleado: any) {
        return this.http.get<any[]>(`${this.URI}/requerimientos-empleado-cliente?cod_empleado=${cod_empleado}`)
    }

    getRequerimientosEmpleadoGeneral(cod_empleado: any) {
        return this.http.get<any[]>(`${this.URI}/requerimientos-empleado-general?cod_empleado=${cod_empleado}`)
    }

    putRequerimiento(body: any) {
        return this.http.put<any[]>(`${this.URI}/actualizar-analista`, body)
    }
}