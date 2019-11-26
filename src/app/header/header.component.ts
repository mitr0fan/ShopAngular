import { Component, OnInit } from '@angular/core';
import { AddToBasketService } from '../add-to-basket.service';
import { Bicycle } from '../bicycle';
import { GetBicyclesService } from '../get-bicycles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private add: AddToBasketService,
    private getBicycles: GetBicyclesService
  ) {}

  arr: Bicycle[] = this.getBicycles.arrBicycles;
  newArr: Bicycle[] = [];

  ngOnInit() {}

  show() {
    this.add.hideBasket = !this.add.hideBasket;
  }

  click(bicycle: Bicycle, div: HTMLElement) {
    this.getBicycles.currentBicycle = bicycle;
    this.newArr = [];
    div.style.height = 0 + 'px';
  }

  search(value: string, div: HTMLElement) {
    value = value.toLowerCase();
    this.newArr = [];
    if (value.length > 0) {
      this.newArr = this.arr.filter(i => {
        const str = i.name.slice(0, value.length).toLowerCase();
        if (str == value) {
          return true;
        }
      });
      if (this.newArr.length > 5) {
        this.newArr.length = 5;
      }
    }
    if (this.newArr.length > 0) {
      div.style.height = (50 + 10) * this.newArr.length + 10 + 'px'; // 50 - offsetHeight, 10 - margin + 10 - padding
    } else {
      div.style.height = 0 + 'px';
    }
  }
}
