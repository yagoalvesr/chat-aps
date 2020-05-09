import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { LoginModule } from './login/login.module';
import { CloseWindowCatcherDirective } from './directives/close-window-catcher.directive';

@NgModule({
  declarations: [
    AppComponent,
    CloseWindowCatcherDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    LoginModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputTextModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
