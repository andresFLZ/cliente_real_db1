import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PerfilesService {

    URI = 'http://localhost:4000/perfiles'

    constructor(private http: HttpClient) { }

    getPerfiles() {
        return this.http.get<any[]>(this.URI)
    }
}