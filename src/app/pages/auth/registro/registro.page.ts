import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(9)]),
    confirmPassword: new FormControl(''),
  });
  constructor() {}

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  //Confirmacion de password.
  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchesValues(this.form.controls.password),
    ]);
    //Actualizacion de los validadores.
    this.form.controls.confirmPassword.updateValueAndValidity();
  }
  //toma lo que se escribio en el formulario.
  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
