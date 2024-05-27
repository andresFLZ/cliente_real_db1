import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CargosService } from 'src/app/services/cargos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FasesService } from 'src/app/services/fases.service';
import { HVService } from 'src/app/services/hv.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PerfilFaseService } from 'src/app/services/perfilFase.service';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { ProcesosCandidatosService } from 'src/app/services/procesosCandidatos.service';
import { ProcesosRequerimientosService } from 'src/app/services/procesosRequerimiento.service';
import { PruebasService } from 'src/app/services/pruebas.service';
import { PruebasCandidatoService } from 'src/app/services/pruebasCandidato.service';
import { RequerimientosService } from 'src/app/services/requerimientos.service';
import { TipoItemPerfilService } from 'src/app/services/tipoItemPerfil.service';

@Component({
  selector: 'app-requerimientos-asistente',
  templateUrl: './requerimientos-asistente.component.html',
  styleUrls: ['./requerimientos-asistente.component.css']
})
export class RequerimientosAsistenteComponent {

  analistaGeneralControl = new FormControl('', [Validators.required]);
  perfilesControl = new FormControl('', [Validators.required]);
  convocatoriaControl = new FormControl('', [Validators.required]);
  invitacionControl = new FormControl('', [Validators.required]);
  fechaPruebaControl = new FormControl('', [Validators.required]);

  empleado: any = {
    NOMEMPLEADO: "nombre",
    APELLEMPLEADO: "apellido",
    CORREO: "correo",
    FECHAINGRE: "fecha"
  }
  requerimientos: any;
  analistasGenerales: any;
  procesos: any;
  procceso_actual: any
  candidatosProceso: any;
  candidatosPreseleccionados: any;
  candidatosSeleccionados: any[] = [];
  pruebasSeleccionadas: any = [];
  mostrarFecha: boolean = false;
  tiposItemPerfil: any;
  instituciones: any;
  fases: any;
  perfiles: any;
  esCliente: boolean = false;
  esGeneral: boolean = false;

  constructor(
    private empleadoService: EmpleadosService,
    private cargoService: CargosService,
    private requerimientosService: RequerimientosService,
    private perfilesService: PerfilesService,
    private procesosRequerimientoService: ProcesosRequerimientosService,
    private perfilFaseService: PerfilFaseService,
    private faseService: FasesService,
    private hvService: HVService,
    private tipoItemPerfilService: TipoItemPerfilService,
    private institucionService: InstitucionService,
    private procesosCandidatoService: ProcesosCandidatosService,
    private pruebasService: PruebasService,
    private pruebasCandidatoService: PruebasCandidatoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.empleado = await this.buscarEmpleadoPorCorreo(params['correo']);
      const cargo_empleado: any = await this.buscarCargoEmpleado(this.empleado.CODEMPLEADO)
      const tipoCargo = cargo_empleado.IDTIPOCARGO;
      if (tipoCargo == "ACL") {
        this.esCliente = true
        this.requerimientos = await this.buscarRequerimientosEmpleadoCliente(this.empleado.CODEMPLEADO);
        this.setearDataRequerimientos();
        this.analistasGenerales = await this.buscarAnalistasGenerales();
        console.log("INFO INGRESAR:", this.empleado, cargo_empleado, this.requerimientos, this.analistasGenerales);
      } else if (tipoCargo == "AG") {
        this.esGeneral = true
        this.requerimientos = await this.buscarRequerimientosEmpleadoGeneral(this.empleado.CODEMPLEADO);
        this.setearDataRequerimientos();
        this.perfiles = await this.buscarPerfiles();
        console.log("INFO INGRESAR:", this.empleado, cargo_empleado, this.requerimientos);
      } else {

      }
    });
    this.fases = await this.buscarFases();
    this.tiposItemPerfil = await this.buscarTiposItemPerfil();
    this.instituciones = await this.buscarInstituciones();
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.candidatosSeleccionados.push(value);
    } else {
      const index = this.candidatosSeleccionados.indexOf(value);
      if (index > -1) {
        this.candidatosSeleccionados.splice(index, 1);
      }
    }
  }

  onCheckboxPruebaChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.pruebasSeleccionadas.push(value);
    } else {
      const index = this.pruebasSeleccionadas.indexOf(value);
      if (index > -1) {
        this.pruebasSeleccionadas.splice(index, 1);
      }
    }
    this.mostrarFecha = this.pruebasSeleccionadas.length > 0;
  }

  buscarFases() {
    return new Promise((resolve, reject) => {
      this.faseService.getFases()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarEmpleadoPorCorreo(correo: any) {
    return new Promise((resolve, reject) => {
      this.empleadoService.getEmpleadoByCorreo(correo)
        .subscribe((res: any) => {
          resolve(res[0])
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarAnalistasGenerales() {
    return new Promise((resolve, reject) => {
      this.empleadoService.getAnalistasGenerales()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarCargoEmpleado(codigo_empleado: any) {
    return new Promise((resolve, reject) => {
      this.cargoService.getCargoEmpleado(codigo_empleado)
        .subscribe((res: any) => {
          resolve(res[0])
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarRequerimientosEmpleadoCliente(codigo_empleado: any) {
    return new Promise((resolve, reject) => {
      this.requerimientosService.getRequerimientosEmpleadoCliente(codigo_empleado)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarRequerimientosEmpleadoGeneral(codigo_empleado: any) {
    return new Promise((resolve, reject) => {
      this.requerimientosService.getRequerimientosEmpleadoGeneral(codigo_empleado)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarHVByFuncion(funcion: any) {
    return new Promise((resolve, reject) => {
      this.hvService.getHVByFuncion(funcion)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarProcesosCandidatoByProcesoRequerimiento(id_proceso: any, id_requerimiento: any, id_fase: any, id_perfil: any) {
    return new Promise((resolve, reject) => {
      this.procesosCandidatoService.getProcesoCandidatoByProcesoRequerimiento(id_proceso, id_requerimiento, id_fase, id_perfil)
        .subscribe((res: any) => {
          console.log(res)
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarProcesosSeleccionadosCandidatoByProcesoRequerimiento(id_proceso: any, id_requerimiento: any, id_fase: any, id_perfil: any) {
    return new Promise((resolve, reject) => {
      this.procesosCandidatoService.getProcesoCandidatoByProcesoRequerimientoSeleccionados(id_proceso, id_requerimiento, id_fase, id_perfil)
        .subscribe((res: any) => {
          console.log(res)
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  async setearDataRequerimientos() {
    for (const requerimiento of this.requerimientos) {
      const funciones: string[] = requerimiento.DESFUNCION.split(", ");
      const carreras: string[] = requerimiento.DESCARRERAS.split(", ");
      requerimiento.DESFUNCION = funciones;
      requerimiento.DESCARRERAS = carreras;
      requerimiento.FASE = await this.calcularFase(requerimiento.CONSECREQUE);
      if (requerimiento.FASE == 3) {
        let candidatosExistentesIds: any[] = [];
        let candidatosExistentes: any[] = [];
        for (const item of requerimiento.DESFUNCION) {
          const response: any = await this.buscarHVByFuncion(item);
          if (response.message && response.message == 'No se encontraron hojas de vida asociadas a la función') {
            continue
          } else {
            for (const hv of response) {
              if (candidatosExistentesIds.includes(hv.CONSEHV)) {
                continue
              } else {
                candidatosExistentesIds.push(hv.CONSEHV)
                candidatosExistentes.push(hv)
              }
            }
          }
        }
        this.candidatosProceso = await this.recuperarCandidatos(candidatosExistentes);
      } else if (requerimiento.FASE == 4) {
        console.log(requerimiento, this.procceso_actual)
        let candidatosExistentesIds: any[] = [];
        let candidatosExistentes: any[] = [];
        const procesosCandidatos: any = await this.buscarProcesosCandidatoByProcesoRequerimiento(this.procceso_actual.CONSPROCESO, this.procceso_actual.CONSECREQUE, parseInt(this.procceso_actual.IDFASE) + 1, this.procceso_actual.IDPERFIL)
        for (const proceso of procesosCandidatos) {
          const response: any = await this.buscarHvCandidato(proceso.USUARIO);
          for (const hv of response) {
            if (candidatosExistentesIds.includes(hv.USUARIO)) {
              continue
            } else {
              candidatosExistentesIds.push(hv.USUARIO)
              candidatosExistentes.push(hv)
            }
          }
        }
        this.candidatosPreseleccionados = await this.recuperarCandidatos(candidatosExistentes);
      } else if (requerimiento.FASE == 5) {
        // TODO: RECUPERAR PRUEBAS ASOCIADAS A COMPUTACIÓN
        const pruebas: any = await this.buscarPruebasComputacion();
        requerimiento.PRUEBAS = pruebas;
      } else if (requerimiento.FASE == 6) {
        const pruebasCom: any = await this.buscarPruebasComputacion();
        const pruebasProceso: any = await this.buscarPruebasProcesoRequerimiento(this.procceso_actual.CONSPROCESO, this.procceso_actual.CONSECREQUE, this.procceso_actual.IDFASE, this.procceso_actual.IDPERFIL)
        console.log(pruebasCom, pruebasProceso)
        const pruebas = pruebasProceso.filter((item: any) => item.IDPRUEBA === pruebasCom.IDPRUEBA)
        console.log(pruebas)
        requerimiento.PRUEBAS = pruebas;
      }
    }
  }

  async recuperarCandidatos(hojasVida: any) {
    let informacionCandidatos: any = []
    let iteracionPrincipal = 0
    for (const hv of hojasVida) {
      informacionCandidatos[iteracionPrincipal] = {
        nombre: hv.USUARIO,
        data: []
      }
      let iteracionSecundaria = 0
      const response: any = await this.buscarHvCandidato(hv.USUARIO)
      for (const item of response) {
        const itemPerfil = this.tiposItemPerfil.find((perfil: any) => perfil.IDTIPOITEMPERFIL == item.IDTIPOITEMPERFIL);
        const institucion = this.instituciones.find((inst: any) => inst.CODINSTITUCION == item.CODINSTITUCION);
        let descripcionesBody: any[] = [];
        let funcionesBody: any[] = [];
        const descripciones = item.DESCACTIVIDAD.split(", ");
        const funciones = item.FUNCIONACTIVIDAD.split(", ");

        for (const desc of descripciones) {
          descripcionesBody.push(desc)
        }
        for (const func of funciones) {
          funcionesBody.push(func)
        }
        const dataHV = {
          "titulacion": itemPerfil.DESCTIPOPRUEBA,
          "fecha_inicio": itemPerfil.FECHAINIACT,
          "fecha_fin": itemPerfil.FECHAFINACT,
          "institucion": institucion.NOMINSTITUCION,
          "descripciones": descripcionesBody,
          "funciones": funcionesBody
        }
        informacionCandidatos[iteracionPrincipal]['data'].push(dataHV)
        iteracionSecundaria++;
      }
      iteracionPrincipal++;
    }
    return informacionCandidatos;
  }

  buscarTiposItemPerfil() {
    return new Promise((resolve, reject) => {
      this.tipoItemPerfilService.getTiposItemPerfil()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarPruebasProcesoRequerimiento(proceso: any, requerimiento: any, fase: any, perfil: any) {
    return new Promise((resolve, reject) => {
      this.pruebasCandidatoService.getPruebasProcesoRequerimiento(proceso, requerimiento, fase, perfil)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarInstituciones() {
    return new Promise((resolve, reject) => {
      this.institucionService.getInstituciones()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarPruebasComputacion() {
    return new Promise((resolve, reject) => {
      this.pruebasService.getPruebasComputacion()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarHvCandidato(usuario: any) {
    return new Promise((resolve, reject) => {
      this.hvService.getHVByUsuario(usuario)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  async calcularFase(cod_requerimiento: any) {
    let fase;
    this.procesos = await this.buscarProcesosRequerimientoByCodReq(cod_requerimiento)
    if (this.procesos.message == "No se encontraron procesos asociados al requerimientos") {
      fase = 1
    } else {
      fase = this.buscarFaseActual(this.procesos)
    }

    return fase
  }

  buscarFaseActual(procesos: any) {
    let faseAlta = 0;
    for (const item of procesos) {
      if (item.FECHAFIN != null && parseInt(item.IDFASE) > faseAlta) {
        faseAlta = parseInt(item.IDFASE)
        this.procceso_actual = item;
      }
    }
    console.log(faseAlta)
    return faseAlta
  }

  buscarProcesosRequerimientoByCodReq(cod_requerimiento: any) {
    return new Promise((resolve, reject) => {
      this.procesosRequerimientoService.getProcesosRequerimientoByCodReq(cod_requerimiento)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString(); // Devuelve la fecha y hora en formato local
  }

  async enviarCorreo(requerimiento: any) {
    const analista = this.analistaGeneralControl.value;
    requerimiento.EMP_CODEMPLEADO1 = analista
    const body = {
      "cod_empleado": requerimiento.EMP_CODEMPLEADO1,
      "consecutivo": requerimiento.CONSECREQUE
    }
    console.log(requerimiento, body)
    const response = await this.actualizarRequerimientoAG(body)
  }

  actualizarRequerimientoAG(body: any) {
    return new Promise((resolve, reject) => {
      this.requerimientosService.putRequerimiento(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarPerfiles() {
    return new Promise((resolve, reject) => {
      this.perfilesService.getPerfiles()
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  buscarPerfilesFaseByPerfil(id_perfil: any) {
    return new Promise((resolve, reject) => {
      this.perfilFaseService.getPerfilesFaseByPerfil(id_perfil)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  async generarProceso(requerimiento: any) {
    const perfil = this.perfilesControl.value;
    let numeroProcesos: any = await this.recuperarNumeroProcesos();
    const perfilesFase: any = await this.buscarPerfilesFaseByPerfil(perfil);
    let fecha_inicio;
    let fecha_fin;
    for (const item of perfilesFase) {
      if (item.IDFASE == 1 || item.IDFASE == 2) {
        fecha_inicio = requerimiento.FECHAREQUE.split('T')[0];
        fecha_fin = this.parseDate(new Date().toLocaleString()).split('T')[0];
      } else {
        fecha_inicio = null;
        fecha_fin = null;
      }
      const bodyProceso = {
        "id_proceso": numeroProcesos + 1,
        "id_requerimiento": requerimiento.CONSECREQUE,
        "id_empleado": requerimiento.EMP_CODEMPLEADO1,
        "id_fase": item.IDFASE,
        "id_perfil": item.IDPERFIL,
        "fecha_inicio": fecha_inicio,
        "fecha_fin": fecha_fin,
        "convocatoria": null,
        "invitacion": null
      }
      await this.crearProcesoRequrimiento(bodyProceso);
      requerimiento.FASE = this.calcularFase(requerimiento.CONSECREQUE)
    }
  }

  recuperarNumeroProcesos() {
    return new Promise((resolve, reject) => {
      this.procesosRequerimientoService.getMaxIdProcesosRequerimiento()
        .subscribe((res: any) => {
          resolve(res[0]["MAX(CONSPROCESO)"])
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  crearProcesoRequrimiento(body: any) {
    return new Promise((resolve, reject) => {
      this.procesosRequerimientoService.postProcesoRequerimiento(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  parseDate(dateString: string): string {
    // Dividir la fecha y la hora
    const [datePart, timePart] = dateString.split(', ');

    // Dividir la fecha en día, mes y año
    const [day, month, year] = datePart.split('/').map(Number);

    // Dividir la hora en hora, minutos, segundos y AM/PM
    const [time, period] = timePart.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Ajustar la hora según AM/PM
    let adjustedHours = hours;
    if (period === 'p. m.' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'a. m.' && hours === 12) {
      adjustedHours = 0;
    }

    // Crear el objeto Date
    const date = new Date(Date.UTC(year, month - 1, day, adjustedHours, minutes, seconds));

    // Convertir al formato ISO 8601
    return date.toISOString();
  }

  async generarConvocatoria(requerimiento: any) {
    const convocatoria = this.convocatoriaControl.value;
    const procesoActual = this.procesos.find((item: any) => parseInt(item.IDFASE) == requerimiento.FASE)
    const body = {
      "convocatoria": convocatoria,
      "id_proceso": procesoActual.CONSPROCESO,
      "id_requerimiento": procesoActual.CONSECREQUE,
      "id_fase": requerimiento.FASE + 1 + "",
      "id_perfil": procesoActual.IDPERFIL,
      "fecha_inicio": this.parseDate(new Date().toLocaleString()).split('T')[0],
      "fecha_fin": this.parseDate(new Date().toLocaleString()).split('T')[0],
    }
    await this.actualizarConvocatoria(body)
    requerimiento.FASE = this.calcularFase(requerimiento.CONSECREQUE)
  }

  actualizarConvocatoria(body: any) {
    return new Promise((resolve, reject) => {
      this.procesosRequerimientoService.putConvocatoriaProcesoRequerimiento(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  actualizarInvitacion(body: any) {
    return new Promise((resolve, reject) => {
      this.procesosRequerimientoService.putinvitacionProcesoRequerimiento(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  actualizarObservacionProcesoCandidato(body: any) {
    return new Promise((resolve, reject) => {
      this.procesosCandidatoService.putObservacionProceso(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  async generarInvitacion(requerimiento: any) {
    const invitacion = this.invitacionControl.value;
    const procesoActual = this.procesos.find((item: any) => parseInt(item.IDFASE) == requerimiento.FASE)
    const procesoRequerimientoBody = {
      "invitacion": invitacion,
      "convocatoria": procesoActual.CONVOCATORIA,
      "id_proceso": procesoActual.CONSPROCESO,
      "id_requerimiento": procesoActual.CONSECREQUE,
      "id_fase": requerimiento.FASE + 1 + "",
      "id_perfil": procesoActual.IDPERFIL,
      "fecha_inicio": this.parseDate(new Date().toLocaleString()).split('T')[0],
      "fecha_fin": this.parseDate(new Date().toLocaleString()).split('T')[0],
    }
    await this.actualizarInvitacion(procesoRequerimientoBody)
    requerimiento.FASE = this.calcularFase(requerimiento.CONSECREQUE)
  }

  async seleccionarCandidatos(requerimiento: any) {
    console.log(this.candidatosSeleccionados, requerimiento, this.procceso_actual)
    const procesoRequerimientoBody = {
      "invitacion": this.procceso_actual.INVITACION,
      "convocatoria": this.procceso_actual.CONVOCATORIA,
      "id_proceso": this.procceso_actual.CONSPROCESO,
      "id_requerimiento": this.procceso_actual.CONSECREQUE,
      "id_fase": requerimiento.FASE + 1 + "",
      "id_perfil": this.procceso_actual.IDPERFIL,
      "fecha_inicio": this.parseDate(new Date().toLocaleString()).split('T')[0],
      "fecha_fin": this.parseDate(new Date().toLocaleString()).split('T')[0],
    }
    await this.actualizarInvitacion(procesoRequerimientoBody)
    requerimiento.FASE = await this.calcularFase(requerimiento.CONSECREQUE)
    for (const candidato of this.candidatosSeleccionados) {
      const procesoCandidatoBody = {
        "observacion": "Seleccionado",
        "id_fase_nueva": requerimiento.FASE + 1 + "",
        "id_usuario": candidato,
        "id_proceso": this.procceso_actual.CONSPROCESO,
        "id_requerimiento": this.procceso_actual.CONSECREQUE,
        "id_fase_actual": requerimiento.FASE,
        "id_perfil": this.procceso_actual.IDPERFIL
      }
      console.log(candidato, procesoCandidatoBody)
      await this.actualizarObservacionProcesoCandidato(procesoCandidatoBody)
    }
  }

  async asignarPruebas(requerimiento: any) {
    // TODO: ACTUALIZAR EL PROCESO ACTUAL
    // TODO: BUSCAR TODOS LOS PROCESO CANDIDATOS QUE ESTEN RELACIONADOS AL PROCESO Y SEAN SELECCIONADOS
    const procesosCandidatosSeleccionados: any = await this.buscarProcesosSeleccionadosCandidatoByProcesoRequerimiento(this.procceso_actual.CONSPROCESO, this.procceso_actual.CONSECREQUE, parseInt(this.procceso_actual.IDFASE) + 1, this.procceso_actual.IDPERFIL);
    //SELECCIONAR LAS PRUEBAS QUE SE USARAN EN EL REQUERIMIENTO
    const fecha = this.fechaPruebaControl.value;
    //RECUPERAR EL NUMERO DE PRUEBAS CANDIADTO ACTUALES
    let numPruebas: any = await this.recuperarNumeroPruebasCandidato();
    console.log('Pruebas seleccionadas:', this.pruebasSeleccionadas, requerimiento, fecha, this.procceso_actual, procesosCandidatosSeleccionados, numPruebas);
    
    for (const item of procesosCandidatosSeleccionados) {
      // VER LO DEL PROCESO ACTUAL, DEBE SER POR REQUERIMIENTO MEJOR Y NO GLOBAL
      for (const prueba of this.pruebasSeleccionadas) {
        // TODO: POR CADA UNA DE LAS PRUEBAS SELECIONADAS SE CREA UNA FILA EN PRUEBA CANDIDATO
        const pruebaCandidatoBody = {
          "id_prueba_candidato": numPruebas + 1,
          "id_usuario": item.USUARIO,
          "id_proceso": item.CONSPROCESO,
          "id_requerimiento": item.CONSECREQUE,
          "id_fase": item.IDFASE,
          "id_perfil": item.IDPERFIL,
          "id_prueba": prueba,
          "fecha": fecha,
          "calificacion": null
        }
        numPruebas ++;
        console.log(prueba, item, pruebaCandidatoBody);
        const res = await this.crearPruebasCandidato(pruebaCandidatoBody)
        console.log(res);

        const procesoRequerimientoBody = {
          "invitacion": this.procceso_actual.INVITACION,
          "convocatoria": this.procceso_actual.CONVOCATORIA,
          "id_proceso": this.procceso_actual.CONSPROCESO,
          "id_requerimiento": this.procceso_actual.CONSECREQUE,
          "id_fase": requerimiento.FASE + 1 + "",
          "id_perfil": this.procceso_actual.IDPERFIL,
          "fecha_inicio": this.parseDate(new Date().toLocaleString()).split('T')[0],
          "fecha_fin": this.parseDate(new Date().toLocaleString()).split('T')[0],
        }
        await this.actualizarInvitacion(procesoRequerimientoBody)
      } 
    }
  }

  crearPruebasCandidato(body: any) {
    return new Promise((resolve, reject) => {
      this.pruebasCandidatoService.postPruebasCandidato(body)
        .subscribe((res: any) => {
          resolve(res)
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

  recuperarNumeroPruebasCandidato() {
    return new Promise((resolve, reject) => {
      this.pruebasCandidatoService.getPruebasCandidato()
        .subscribe((res: any) => {
          console.log(res)
          if (res.message && res.message == "No se encontraron procesos") {
            resolve(0)
          } else {
            resolve(res.length)
          }
        },
          (error: any) => {
            console.log(error);
            reject([]);
          });
    });
  }

}
