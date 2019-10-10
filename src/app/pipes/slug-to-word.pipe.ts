import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugToWord'
})
export class SlugToWordPipe implements PipeTransform {

  transform(value: string): string {
    value = value.trim().replace(/-/g, " ").toLowerCase();
    return value;
  }

}
