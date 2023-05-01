import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}
  //toma lo que se escribio en el formulario.
  submit() {
    if (this.form.valid) {
      //mostrar carga de datos
      this.utilsSvc.presentLoading({ message: 'Autenticando...' });
      //ingresamos mediante el logueo
      this.firebaseSvc.login(this.form.value as User).then(
        async (res) => {
          console.log(res);

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
          this.utilsSvc.routerLink('/tabs/home');
          //una vez que se carguen los datos, finalizamos la carga.
          this.utilsSvc.dismissLoading();
          //mesaje por pantalla
          this.utilsSvc.presentToast({
            message: `Te damos la Bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'preson-outline',
          });
          //una vez se logueo, se resetea el formulario.
          this.form.reset();
        },
        (error) => {
          this.utilsSvc.presentToast({
            message: error,
            duration: 5500,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
          //una vez que se carguen los datos, finalizamos la carga.
          this.utilsSvc.dismissLoading();
        }
      );
    }
  }
}
