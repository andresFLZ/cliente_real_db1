import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProcesosCandidatosService {

    URI = 'http://localhost:4000/procesos-candidato'

    constructor(private http: HttpClient) { }

    getProcesoCandidatoByProcesoRequerimiento(id_proceso: any, id_requerimiento: any, id_fase: any, id_perfil: any) {
        return this.http.get<any[]>(`${this.URI}/proceso-requerimiento?id_proceso=${id_proceso}&id_requerimiento=${id_requerimiento}&id_fase=${id_fase}&id_perfil=${id_perfil}`)
    }

    getProcesoCandidatoByProcesoRequerimientoSeleccionados(id_proceso: any, id_requerimiento: any, id_fase: any, id_perfil: any) {
        return this.http.get<any[]>(`${this.URI}/proceso-requerimiento?id_proceso=${id_proceso}&id_requerimiento=${id_requerimiento}&id_fase=${id_fase}&id_perfil=${id_perfil}`)
    }

    putObservacionProceso(body: any) {
        return this.http.put<any[]>(`${this.URI}/actualizar-observacion`, body)
    }
}