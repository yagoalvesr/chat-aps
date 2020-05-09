import {Component} from '@angular/core';
import {HostListener} from '@angular/core';
import {ChatService} from './chat/service/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private chatService: ChatService){}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {

    const data = this.chatService.data;

    this.chatService.sairSala(data);

    alert('teste');
  }
}

