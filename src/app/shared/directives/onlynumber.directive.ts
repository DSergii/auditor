import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[rpaOnlynumber]'
})
export class OnlynumberDirective {

  @Input() numCondition: any;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  allowOnlyNumbers(event) {
    if(this.numCondition) {
      if(this.numCondition == 2) {
        this.permit(event);
      }
    } else {
      this.permit(event);
    }
  }

  /**
   * allow only numbers, delete, backspace buttons
   * @param event
   * @returns {any}
   */
  permit(event): any {
    if ((event.keyCode >= 48 && event.keyCode <= 57)
      || (event.keyCode >= 96 && event.keyCode <= 105)
      || (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46)) {
      if(this.el.nativeElement.value === '0')
        this.el.nativeElement.value = '';
      return;
    } else {
      event.preventDefault();
    }
  }
}
