import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appCloseWindowCatcher]'
})
export class CloseWindowCatcherDirective {

  constructor() { }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event){
    console.log(event);
    window.alert('teste');
  }

}
