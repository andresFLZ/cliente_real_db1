import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FasesService {

    URI = 'http://localhost:4000/fases'

    constructor(private http: HttpClient) { }

    getFases() {
        return this.http.get<any[]>(this.URI)
    }
}