import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'rpa-email-header',
  templateUrl: './email-header.component.html',
  styleUrls: ['./email-header.component.css']
})
export class EmailHeaderComponent {

  @Input() email: string;
  public activeDropDown: boolean = false;

  @HostListener('window:click', ['$event'])
  closeDropDown(event) {
    if(!event.target.closest('.email')) {
      this.activeDropDown = false;
    }
  }

}
