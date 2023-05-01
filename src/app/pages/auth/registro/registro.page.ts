import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
    confirmPassword: new FormControl(''),
  });
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

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
      
      //mostrar carga de datos
      this.utilsSvc.presentLoading({message:'Registrando...'})
      //primero registramos el usuario
      this.firebaseSvc.signUp(this.form.value as User).then(
        async (res) => {
          console.log(res);
          //luego actualizamos el nombre el usuario tomando el valor del input del registro
          await this.firebaseSvc.updateUser({
            displayName: this.form.value.name,
          }); //displayName permite editar la variable del usuario
          //variable local para guardar el usuario
          let user: User = {
            //estructura
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };
          //mandamos los datos para guardar
          this.utilsSvc.setElementInLocalStorage('user', user);
          //enrutamiento de tabs
          this.utilsSvc.routerLink('/tabs');
          //una vez que se carguen los datos, finalizamos la carga.
          this.utilsSvc.dismissLoading();
          //mesaje por pantalla
          this.utilsSvc.presentToast({
            message:`Te damos la Bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'preson-outline'
          })
        },
        (error) => {
          this.utilsSvc.presentToast({
            message:error,
            duration: 5500,
            color: 'warning',
            icon: 'alert-circle-outline'
          })
          //una vez que se carguen los datos, finalizamos la carga.
          this.utilsSvc.dismissLoading()
        }
      );
    }
  }
}
