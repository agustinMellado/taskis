import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
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
  constructor(private firebaseSvc: FirebaseService) {}

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
    this.firebaseSvc.signUp(this.form.value as User).then(async res=>{
      console.log(res)
      //Registramos al usuario pasando por parametro el name tomado del formulario
      await this.firebaseSvc.updateUser({displayName: this.form.value.name}) //displayName permite editar la variable del usuario
    }, error=>{
      console.log(error);
    })
  }
}
