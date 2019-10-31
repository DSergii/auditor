import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rpa-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Output() back: EventEmitter<string> = new EventEmitter<string>();
  @Input() email: string;

  backToLogin(): void {
    this.back.emit('');
  }

}
