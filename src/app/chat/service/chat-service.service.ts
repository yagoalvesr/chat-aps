import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {DataModel} from 'src/app/models/data-model';

@Injectable({
  providedIn: 'root'
})


export class ChatService {

  private url = 'http://127.0.0.1:3000';
  private socket;
  data: DataModel;

  constructor() {
    this.socket = io(this.url);
  }


  novoUsarioEntrou() {
    const observable = new Observable<any>(observer => {
      this.socket.on('novo-usuario-entrou', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  usuarioSaiu() {
    const observable = new Observable<any>(observer => {
      this.socket.on('deixou-sala', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  mensagemEnviada() {
    const observable = new Observable<any>(observer => {
      this.socket.on('nova-mensagem', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  receberListaUsuarios() {
    const observable = new Observable<any>(observer => {
      this.socket.on('enviar-lista-usuarios', (listaUsuarioFromMap) => {
        const usuariosMap = new Map(JSON.parse(listaUsuarioFromMap));
        observer.next(usuariosMap);
      });
    });

    return observable;
  }

  receberListaUsuarioParaValidacao() {
    const observable = new Observable<any>(observer => {
      this.socket.on('lista-usuarios', (listaUsuarioFromMap) => {
        console.log('receberListaUsuarioParaValidacao', listaUsuarioFromMap);
        const usuariosMap = new Map(JSON.parse(listaUsuarioFromMap));
        observer.next(usuariosMap);
      });
    });

    return observable;
  }

  entrarSala(data) {
    this.socket.emit('entrar', data);
  }

  sairSala(data) {
    this.socket.emit('sair', data);
  }

  enviarMensagem(data) {
    this.socket.emit('mensagem', data);
  }

  carregarListaUsuarios(codigoSala) {
    this.socket.emit('carregar-lista-usuarios', codigoSala);
  }

  validarUsuario() {
    console.log('validarUsuario');
    this.socket.emit('verificar-lista-usuarios');
  }

}
