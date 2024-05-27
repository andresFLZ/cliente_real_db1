import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PruebasCandidatoService {

    URI = 'http://localhost:4000/pruebas-candidato'

    constructor(private http: HttpClient) { }

    getPruebasCandidato() {
        return this.http.get<any[]>(this.URI);
    }

    getPruebasProcesoRequerimiento(proceso: any, requerimiento: any, fase: any, perfil: any) {
        return this.http.get<any[]>(`${this.URI}/proceso-requerimiento?id_proceso=${proceso}&id_requerimiento=${requerimiento}&id_fase=${fase}&id_perfil=${perfil}`);
    }

    postPruebasCandidato(body: any) {
        return this.http.post<any[]>(this.URI, body);
    }
}