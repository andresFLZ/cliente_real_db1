import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmpleadosService {

    URI = 'http://localhost:4000/empleados'

    constructor(private http: HttpClient) { }

    getEmpleados() {
        return this.http.get<any[]>(this.URI)
    }

    getEmpleadoByCorreo(correo: any) {
        return this.http.get<any[]>(`${this.URI}/correo?correo=${correo}`)
    }

    getAnalistasGenerales() {
        return this.http.get<any[]>(`${this.URI}/analistas-generales`)
    }
}