import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/user.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: IUser[], searchQuery: string): IUser[] {
    if (!searchQuery) {
      return items;
    }
    return items.filter(item =>
      item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

}
