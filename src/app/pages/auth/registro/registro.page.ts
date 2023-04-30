import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  form = new FormGroup({
    name:new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit() {}
  //toma lo que se escribio en el formulario.
  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
