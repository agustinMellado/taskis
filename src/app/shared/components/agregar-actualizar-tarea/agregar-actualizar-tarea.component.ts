import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Tareas } from 'src/app/models/tareas.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-agregar-actualizar-tarea',
  templateUrl: './agregar-actualizar-tarea.component.html',
  styleUrls: ['./agregar-actualizar-tarea.component.scss'],
})
export class AgregarActualizarTareaComponent  implements OnInit {
  //configuracion para que se puedan editar las tareas
  @Input() tarea:Tareas;
  user={} as User
 //formulario para poder editar las tareas
  form= new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('',[Validators.required,Validators.minLength(4)]),
    descripcion: new FormControl('',[Validators.required,Validators.minLength(4)]),
    item: new FormControl([],[Validators.required,Validators.minLength(1)])

  })
  constructor(
    private firebaseSvc:FirebaseService,
    private utilsSvc:UtilsService
  ) { }

  ngOnInit() {
    this.user= this.utilsSvc.getElementFrontLocalStorage('user')

    //si existe la tarea 
    if(this.tarea){//la necesitamos visualizar para poder editarla.
      this.form.setValue(this.tarea);
      this.form.updateValueAndValidity()
    }
  }

}
