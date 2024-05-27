import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HVService {

    URI = 'http://localhost:4000/hv'

    constructor(private http: HttpClient) { }

    getHVByFuncion(funcion: any) {
        return this.http.get<any[]>(`${this.URI}/funcion?funcion=${funcion}`)
    }

    getHVByUsuario(usuario: any) {
        return this.http.get<any[]>(`${this.URI}/usuario?usuario=${usuario}`)
    }
}