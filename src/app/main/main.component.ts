import { Component, OnInit } from '@angular/core';
import { GetBicyclesService } from '../get-bicycles.service';
import { Bicycle } from '../bicycle';
import { AddToBasketService } from '../add-to-basket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  arrBicycles: Array<Bicycle> = [];
  bicycles: Array<Bicycle>;

  constructor( private getBicycles: GetBicyclesService, private add: AddToBasketService ) { }

  ngOnInit() {
    if (this.getBicycles.arrBicycles.length === 0) {
      this.getBicycles.getBicycles();
    }
    this.arrBicycles = this.getBicycles.arrBicycles;
  }

  getArr(arr: Bicycle[]) {
    this.bicycles = arr;
  }

  currentBicycle(bicycle: Bicycle) {
    this.getBicycles.currentBicycle = bicycle;
    this.getBicycles.bicycles = this.bicycles;
  }

  addToBasket(obj: Bicycle) {
    this.add.addToBasket(obj);
  }
}
