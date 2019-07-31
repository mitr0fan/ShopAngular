import { Injectable } from '@angular/core';
import { Bicycle } from './bicycle';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor() { }

  count = 0;

  compareShell(value: number) {
    let count: number = value;

    return compare;

    function compare(obj: Bicycle, arr: string[], price?: any): Bicycle {
      // tslint:disable-next-line: forin
      for (const key in obj) {
        if (typeof(obj[key]) !== 'object') {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < arr.length; j++) {
            if (obj[key] === arr[j] && typeof(arr[j]) !== 'object') { ++count; }
          }
        } else {
          compare(obj[key], arr);
        }

        if (key === 'price' && price.minPrice !== undefined) {
          if (obj[key] >= price.minPrice && obj[key] <= price.maxPrice) { ++count; }
        }
      }

      if (count === arr.length + 1) { return obj; } else { return; }
    }
  }
}
