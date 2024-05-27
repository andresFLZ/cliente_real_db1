import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InstitucionService {

    URI = 'http://localhost:4000/instituciones'

    constructor(private http: HttpClient) { }

    getInstituciones() {
        return this.http.get<any[]>(this.URI)
    }
}