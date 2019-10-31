import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorLabel'
})
export class ColorLabelPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(!value)
      return 'empty';
    if(Array.isArray(value) && !value.length)
      return 'empty';
    return '';
  }

}
