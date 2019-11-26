import { Injectable } from '@angular/core';
import { Bicycle } from './bicycle';

@Injectable({
  providedIn: 'root',
})
export class AddToBasketService {
  constructor() {}

  bicycles: Bicycle[] = [];
  hideBasket = true;
  price = 0;

  addToBasket(obj: Bicycle) {
    if (obj.fullName != 'Выберите велосипед') {
      this.bicycles.push(obj);
    }
  }

  changeAmount(sign?: HTMLElement, count?) {
    let sum = 0;

    if (sign != undefined && count != undefined) {
      if (sign.textContent == '-' && count.textContent > 0) {
        --count.textContent;
      }
      if (sign.textContent == '+') {
        ++count.textContent;
      }
    }

    setTimeout(() => {
      const amount = document.querySelectorAll('.amountList');
      for (let i = 0; i < amount.length; i++) {
        sum += this.bicycles[i].price * +amount[i].textContent;
      }
      this.price = sum;
    }, 0);
  }

  clear() {
    this.bicycles = [];
    this.price = 0;
  }
}
