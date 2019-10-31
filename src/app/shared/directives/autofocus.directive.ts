import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[rpaAutofocus]'
})
export class AutofocusDirective {

  constructor(el: ElementRef) {
    if(el) {
      setTimeout(()=> {
        el.nativeElement.focus();
      }, 100);
    }
  }

}
