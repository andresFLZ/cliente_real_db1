import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProcesosRequerimientosService {

    URI = 'http://localhost:4000/procesos-requerimiento'

    constructor(private http: HttpClient) { }

    getMaxIdProcesosRequerimiento() {
        return this.http.get<any[]>(`${this.URI}/max-id`)
    }

    getProcesosRequerimiento() {
        return this.http.get<any[]>(this.URI)
    }

    getProcesosRequerimientoByCodReq(cod_requerimiento: any) {
        return this.http.get<any[]>(`${this.URI}/cod-requerimiento?cod_requerimiento=${cod_requerimiento}`)
    }

    postProcesoRequerimiento(body: any) {
        return this.http.post<any[]>(this.URI, body)
    }

    putConvocatoriaProcesoRequerimiento(body: any) {
        return this.http.put<any[]>(`${this.URI}/actualizar-convocatoria`, body)
    }

    putinvitacionProcesoRequerimiento(body: any) {
        return this.http.put<any[]>(`${this.URI}/actualizar-invitacion`, body)
    }
}