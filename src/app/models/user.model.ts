export interface User{

    uid:string;
    name:string;
    email:string;
    password?:string;// se aplica ? para que no tire error al no guardar la pass en localStorage, esto no es correcto. vuelve vulnerable el programa.
}