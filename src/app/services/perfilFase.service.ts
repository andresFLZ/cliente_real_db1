import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PerfilFaseService {

    URI = 'http://localhost:4000/perfil-fases'

    constructor(private http: HttpClient) { }

    getPerfilesFaseByPerfil(id_perfil: any) {
        return this.http.get<any[]>(`${this.URI}/cod_perfil?idPerfil=${id_perfil}`)
    }
}