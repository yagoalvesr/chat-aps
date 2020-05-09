import {SalaModel} from './sala-model';
import {UsuarioModel} from './usuario-model';

export class DataModel{

  usuario: UsuarioModel = new UsuarioModel();
  sala: SalaModel;
  mensagem: string;

}
