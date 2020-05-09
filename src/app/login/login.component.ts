import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../chat/service/chat-service.service';
import {SalaModel} from '../models/sala-model';
import {DataModel} from '../models/data-model';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: DataModel = new DataModel();

  usuario: string;
  usuarioLogado: string;

  salas: Array<SalaModel> = [];
  sala: SalaModel;

  senha: string;
  senhaSala: string;
  senhaIncorreta: boolean;
  senhaValida: boolean;
  nomeEmUso: boolean;

  displayModal: boolean;
  CAMINHO_SALA_CHAT = '/sala-chat';

  constructor(private router: Router, private chatService: ChatService, private loginService: LoginService) {
    this.senhaSala = '123';
  }

  ngOnInit(): void {

    this.salas.push(
      {nome: 'Secretaria do Estado do Meio Ambiente', code: 1},
      {nome: 'Secretaria do Estado do Educação', code: 2}
    );

    this.chatService.receberListaUsuarioParaValidacao().subscribe((mapListaUsuario) => {

      console.log('login component', mapListaUsuario);

      this.nomeEmUso = false;

      mapListaUsuario.forEach(value => {

        console.log('value', value);
        console.log('usuarioLogado', this.usuario);
        console.log('value === usuarioLogado', value === this.usuarioLogado);

        if (value === this.usuario) {
          console.log('ENTROU if value === usuarioLogado');
          this.nomeEmUso = true;
        }

      });

      console.log('nomeEmUso', this.nomeEmUso);
      if (!this.nomeEmUso) {
        console.log('ENTROU entrarSala');

        this.entrar();

      }

    });
  }

  validarSenha(senha: string) {

    if (this.senhaSala === senha) {
      this.entrarSala();
    } else {
      this.senhaIncorreta = true;
    }
  }

  entrar() {

    this.usuarioLogado = this.usuario;

    if (this.sala.code === 1) {
      this.showModalDialog();
    } else {
      this.entrarSala();
    }

    this.usuario = '';
  }

  entrarSala() {

    this.displayModal = false;
    this.senhaValida = true;

    this.data.usuario.usuario = this.usuarioLogado;
    this.data.sala = this.sala;

    this.chatService.data = this.data;

    this.chatService.entrarSala(this.data);
    this.navigate();

  }

  validarUsuario() {
    this.chatService.validarUsuario();
  }

  sair() {
    this.usuarioLogado = '';

    this.data.usuario.usuario = this.usuario;
    this.data.sala = this.sala;

    this.displayModal = false;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  navigate() {
    this.router.navigate([this.CAMINHO_SALA_CHAT]);
  }

}
