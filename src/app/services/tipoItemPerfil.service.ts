import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TipoItemPerfilService {

    URI = 'http://localhost:4000/tipo-item-perfil'

    constructor(private http: HttpClient) { }

    getTiposItemPerfil() {
        return this.http.get<any[]>(this.URI)
    }
}