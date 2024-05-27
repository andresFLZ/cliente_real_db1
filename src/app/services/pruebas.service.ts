import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PruebasService {

    URI = 'http://localhost:4000/pruebas'

    constructor(private http: HttpClient) { }

    getPruebasComputacion() {
        return this.http.get<any[]>(`${this.URI}/computacion`)
    }
}