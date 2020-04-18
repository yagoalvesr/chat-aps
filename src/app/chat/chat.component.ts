import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat-service.service';
import { SelectItem } from 'primeng/api';
import { MensagemModel } from '../models/mensagem-model';
import { SalaModel } from '../models/sala-model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  mensagem: MensagemModel;

  salas: Array<SalaModel> = [];

  listMensagem: Array<any> = [];

  usuario: string;
  usuarioLogado: string;
  sala: SalaModel;
  textoMensagem: string;

  senhaSala: string;
  senha: string;
  senhaIncorreta: boolean;
  senhaValida: boolean;

  displayModal: boolean;

  displayBasic: boolean;

  constructor(private chatService: ChatService) {
    this.senhaSala = '123';
  }

  ngOnInit() {
    this.textoMensagem = ' ';

    this.salas.push(
      { nome: 'Secretaria do Estado do Meio Ambiente', code: 1 },
      { nome: 'Secretaria do Estado do Educação', code: 2 }
    );

    this.chatService.novoUsarioEntrou().subscribe((data) => {
      this.listMensagem.push(data);
    });

    this.chatService.usuarioSaiu().subscribe((data) => {
      this.listMensagem.push(data);
    });

    this.chatService.mensagemEnviada().subscribe((data) => {
      data.usuario = data.usuario + ' disse';
      this.listMensagem.push(data);
    });
  }

  validarSenha(senha: string) {
    if (this.senhaSala === senha) {
      this.displayModal = false;
      this.senhaValida = true;

      let data = {
        usuario: this.usuarioLogado,
        sala: this.sala.code,
      };

      this.chatService.entrouSala(data);
    } else {
      this.senhaIncorreta = true;
    }
  }

  entrar() {
    this.usuarioLogado = this.usuario;

    console.log(this.usuario)

    if (this.sala.code === 1) {
      this.showModalDialog();
    }

    this.usuario = '';
  }

  sair() {
    this.usuarioLogado = '';

    let data = {
      usuario: this.usuario,
      sala: this.sala.code,
    };
    this.chatService.saiuSala(data);

    window.location.reload();
  }

  enviar() {
    let data = {
      sala: this.sala.code,
      usuario: this.usuarioLogado,
      mensagem: this.textoMensagem,
    };
    this.chatService.enviarMensagem(data);

    this.textoMensagem = '';
  }

  addEmoji(e) {
    this.textoMensagem = this.textoMensagem + e.emoji.native;
  }

  showModalDialog() {
    this.displayModal = true;
  }

}
