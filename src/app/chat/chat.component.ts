import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MensagemModel} from '../models/mensagem-model';
import {SalaModel} from '../models/sala-model';
import {ChatService} from './service/chat-service.service';
import {DataModel} from '../models/data-model';
import {UsuarioModel} from '../models/usuario-model';
import {LoginService} from '../login/service/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  mensagem: MensagemModel = new MensagemModel();
  data: DataModel = new DataModel();
  sala: SalaModel;

  @ViewChild('myList') myList;

  listMensagem: Array<MensagemModel> = [];
  usuarioList: Array<UsuarioModel> = [];

  usuarioLogado: UsuarioModel = new UsuarioModel();
  textoMensagem: string;

  constructor(private chatService: ChatService, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.textoMensagem = ' ';

    this.data = this.chatService.data;

    this.verificarUsuarioLogado();

    this.chatService.novoUsarioEntrou().subscribe((data) => {
      this.inserirMensagem(data);
    });

    this.chatService.usuarioSaiu().subscribe((data) => {
      this.removerDaListaUsuario(data);
      this.inserirMensagem(data);

    });

    this.chatService.mensagemEnviada().subscribe((data) => {
      this.inserirMensagem(data);
    });

    this.chatService.receberListaUsuarios().subscribe((usuariosMap) => {
      this.carregarListaUsuarios(usuariosMap);
    });

  }

  enviar() {

    this.textoMensagem = this.textoMensagem.replace('<br>', '');
    this.data.mensagem = this.textoMensagem;

    this.chatService.enviarMensagem(this.data);

    this.textoMensagem = '';
  }

  verificarUsuarioLogado() {
    if (!this.data) {
      this.navigate();
    } else {
      this.carregarListaUsuariosFromServer(this.data.sala.code);
    }
  }

  navigate() {
    this.router.navigate(['/index']);
  }

  inserirMensagem(data) {

    const mensagemTemp: MensagemModel = new MensagemModel();

    mensagemTemp.usuario = data.usuario.usuario;
    mensagemTemp.mensagem = data.mensagem;

    this.listMensagem.push(mensagemTemp);

  }

  carregarListaUsuarios(usuariosMap) {

    const listaUsuariosTemp = new Array<UsuarioModel>();

    for (const [key, value] of usuariosMap) {

      if (this.data) {
        if (value === this.data.usuario.usuario) {
          this.usuarioLogado.usuario = value;
          this.usuarioLogado.code = key;
          this.chatService.data.usuario.code = this.usuarioLogado.code;
        }
      }

      if (value) {
        const usuarioModel: UsuarioModel = new UsuarioModel();
        usuarioModel.code = key;
        usuarioModel.usuario = value;
        listaUsuariosTemp.push(usuarioModel);
      }
    }

    this.usuarioList = listaUsuariosTemp;

  }

  private carregarListaUsuariosFromServer(codigoSala) {
    this.chatService.carregarListaUsuarios(codigoSala);
  }

  private removerDaListaUsuario(data: DataModel) {

    const novaLista = this.usuarioList.filter((usuario) => {

      return !(usuario.code === data.usuario.code);

    });

    this.usuarioList = novaLista;
  }

  public sair() {
    // this.chatService.sairSala(this.data);
    window.location.reload();
  }

  public scrollToBottom() {
    this.myList.nativeElement.scrollTop = this.myList.nativeElement.scrollHeight;
  }

}



