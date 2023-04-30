import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;

  
  isPassword:boolean;
  hide:boolean=true;
  
  constructor() { }

  ngOnInit() {
    if(this.type=='password') this.isPassword=true;
  }
  //funcion que se encarga de cambiar el valor de la variable hide
  showOrHidePassword(){
    //si la variable hide es true la cambia a false, y biseversa
    this.hide=!this.hide
    if(this.hide){
      this.type='password'
    }else{
      this.type='text'
    }
  }


}
