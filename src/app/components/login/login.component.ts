import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correoControl = new FormControl('', [Validators.required]);

  constructor (
    private router: Router
  ) {}

  async ingresar() {
    const correo = this.correoControl.value;
    this.router.navigateByUrl('/requerimientos/'+correo);
  }
}
