import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private url = 'http://192.168.15.6:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }


  novoUsarioEntrou(){
    let observable = new Observable<any>(observer => {
      this.socket.on('novo-usuario-entrou', (data) => {

        observer.next(data);
      })
    })

    return observable;
  }

  usuarioSaiu(){
    let observable = new Observable<any>(observer => {
      this.socket.on('deixou-sala', (data) => {
        observer.next(data);
      })
      return () => {
        this.socket.disconnect()}
    })

    return observable;
  }

  mensagemEnviada(){
    let observable = new Observable<any>(observer => {
      this.socket.on('nova-mensagem', (data) => {
        observer.next(data);
      })

    })

    return observable;
  }

  entrouSala(data){
    this.socket.emit('entrar', data);
  }

  saiuSala(data){
    this.socket.emit('sair', data);
  }

  enviarMensagem(data){

    this.socket.emit('mensagem', data);
  }

}
