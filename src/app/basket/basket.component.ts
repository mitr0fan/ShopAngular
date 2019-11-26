import { Component, OnInit } from '@angular/core';
import { AddToBasketService } from '../add-to-basket.service';
import { GetBicyclesService } from '../get-bicycles.service';
import { Bicycle } from '../bicycle';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor(
    private add: AddToBasketService,
    private getBicycles: GetBicyclesService
  ) {}

  ngOnInit() {}

  details(obj: Bicycle) {
    this.getBicycles.currentBicycle = obj;
  }

  hide() {
    this.add.hideBasket = true;
  }

  close() {
    this.add.hideBasket = true;
  }

  submit() {
    if (this.add.bicycles.length > 0) {
      const check = {
        fullPrice: 0,
      };
      const amount = document.querySelectorAll('.amountList');
      let sum = 0;
      for (let i = 0; i < this.add.bicycles.length; i++) {
        const obj = {
          name: '',
          price: 0,
          amount: 0,
        };
        obj.name = this.add.bicycles[i].name;
        obj.price = this.add.bicycles[i].price;
        obj.amount = +amount[i].textContent;
        check[obj.name] = obj;
        sum += obj.price * obj.amount;
      }
      check.fullPrice = sum;
      console.log(JSON.stringify(check));

      /*
      this.getBicycles.http.post('https://demo4164358.mockable.io/bicycles',
      JSON.stringify(check))
      .subscribe((i) => i);
      */

      this.add.clear();
    }
  }
}
