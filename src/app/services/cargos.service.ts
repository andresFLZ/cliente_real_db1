import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CargosService {

    URI = 'http://localhost:4000/cargos'

    constructor(private http: HttpClient) { }

    getCargoEmpleado(cod_empleado: any) {
        return this.http.get<any[]>(`${this.URI}/cargo-empleado?cod_empleado=${cod_empleado}`)
    }
}