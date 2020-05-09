import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {UsuarioModel} from '../../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  listaUsuarios: UsuarioModel[];

  constructor() {
  }

}
