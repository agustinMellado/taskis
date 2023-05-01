import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvs: UtilsService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //aplicacion de guard para prevenir que entren sin un usuario creado.
    return this.firebaseSvc.getAuthState().pipe(
      map((auth) => {
        //si existe usuario autenticado
        if (auth) {
          return true;
          //No existe usuario autenticado
        } else {
          //si es falso aplico el guard y redirijo la ruta.
          this.utilsSvs.routerLink('/auth');
          return false;
        }
      })
    );
  }
}
