import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompareService } from '../compare.service';
import { Bicycle } from '../bicycle';
import { GetBicyclesService } from '../get-bicycles.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private compareService: CompareService, private getBicycles: GetBicyclesService) {
  }

  @Input() arrBicycles: Bicycle[];

  @Output() bicyclesOut = new EventEmitter();

  bicycles: Bicycle[] = [];

  paramsArr: string[] = [];      // array with parameters of filter
  price = {                     // obj for sorting arrBicycle
    minPrice: 5000,
    maxPrice: 120000
  };

  min = 5000;
  max = 120000;

  // arrays for making template with *ngFor Directive
  p1 = ['Сортировка', 'Бренд' , 'Цена', 'Модельный год', 'Пол', 'Возрастная группа', 'Материал рамы', 'Амортизация', 'Размер колес'];
  p2 = [['По алфавиту', 'По цене - по возрастанию', 'По цене - по убыванию'], ['Forward', 'Format', 'Altair'], [],
  ['2019', '2018', '2017', '2016', '2015', '2014', '2013'], ['Мужской', 'Женский', 'Унисекс'], ['Для взрослых',
  'Для подростков', 'Для детей'], ['Алюминий', 'Сталь'], ['Жесткая вилка', 'Передняя амортизационная вилка',
  'Передняя амортизационная вилка и задний амортизатор'], ['12"', '14"', '16"', '18"', '20"', '24"', '26"', '27.5"', '29"']];

  lastTop = 0;

  ngOnInit() {
    if (this.getBicycles.previousArr == undefined) {
      this.bicycles = this.arrBicycles;
    } else { this.bicycles = this.getBicycles.previousArr; }
    this.giveBicycles();
  }

  // animation filteres
  open(e: HTMLElement) {
    const up: HTMLElement = e.querySelector('.up');
    if (e.style.height == '' || e.style.height == '17px') {
      e.style.height = e.scrollHeight - 20 + 'px';
      up.style.transform = 'rotate(180deg)';
    } else {
      e.style.height = 17 + 'px';
      up.style.transform = 'rotate(0deg)';
    }
  }

  // handler for clicking on checkBoxes
  check(checkDiv?: HTMLElement) {
    this.bicycles = [];
    const items: NodeListOf<HTMLElement> = document.body.querySelectorAll('.item');

    if (checkDiv != undefined) {
      const checkBox: HTMLElement = checkDiv.querySelector('.checkBox');

      // change color of checkBox
      const elem = checkDiv.parentElement.firstElementChild.textContent;
      if (checkBox.style.backgroundColor == '') {
        if (elem.slice(0, elem.length - 1) != 'Сортировка') {
          this.paramsArr.push(checkDiv.lastElementChild.textContent);
        } else {
          const sort: NodeListOf<HTMLElement> = checkDiv.parentElement.querySelectorAll('.checkBox');
          for ( let i = 0; i < sort.length; i++ ) {
            sort[i].style.backgroundColor = '';
          }
        }
        checkBox.style.backgroundColor = 'black';
      } else {
        checkBox.style.backgroundColor = '';
        for (let i = 0; i < this.paramsArr.length; i++) {
          if (this.paramsArr[i] == checkDiv.lastElementChild.textContent) {
            this.paramsArr.splice(i, 1);
          }
        }
      }
    }

    let itemCount = 0;     // if checkBoxes are in the same Items: ++itemCount

    for ( let i = 0; i < items.length; i++ ) {
      const checkArr: NodeListOf<HTMLElement> = items[i].querySelectorAll('.checkBox');
      let sum = 0;
      for ( let j = 0; j < checkArr.length; j++ ) {
        if (checkArr[j].style.backgroundColor != '') {
          ++sum;
          if (sum > 1) { ++itemCount; }
        }
      }
    }

    // compare arrParams with each obj in arrBicycles and if they are simillar push obj in bicycles
    for ( let i = 0; i < this.arrBicycles.length; i++ ) {
      const func = this.compareService.compareShell(itemCount);
      const obj: Bicycle = func(this.arrBicycles[i], this.paramsArr, this.price);
      if (obj != undefined) { this.bicycles.push(obj); }
    }

    const sortCheck: NodeListOf<HTMLElement> = document.body.querySelector('.item').querySelectorAll('.checkBox');

    for ( let i = 0; i < sortCheck.length; i++ ) {
      if (sortCheck[i].style.backgroundColor == 'black') {
        this.sort(sortCheck[i].parentElement);
      }
    }
  }

  sort(checkDiv: HTMLElement) {
    if (checkDiv.lastElementChild.textContent == 'По алфавиту') {
      this.bicycles.sort((a, b) => {
        if (a.name > b.name) { return 1; } else { return -1; }
      });
    }
    if (checkDiv.lastElementChild.textContent == 'По цене - по возрастанию') {
      this.bicycles.sort((a, b) => {
        if (a.price > b.price) { return 1; } else { return -1; }
      });
    }
    if (checkDiv.lastElementChild.textContent == 'По цене - по убыванию') {
      this.bicycles.sort((a, b) => {
        if (b.price > a.price) { return 1; } else { return -1; }
      });
    }
  }

  giveBicycles(elem?: HTMLElement) {
    this.bicyclesOut.emit(this.bicycles);
    this.getBicycles.previousArr = this.bicycles;
    if (elem != undefined) { elem.hidden = true; }
  }
  amountOfBicycles(event, elem: HTMLElement) {
    if (event.type != 'input') {
      if (Math.abs(event.pageY - elem.clientHeight / 2 - this.lastTop) > 10) {
        elem.style.top = event.pageY - elem.clientHeight / 2 + 'px';
      }
      this.lastTop = event.pageY - elem.clientHeight / 2;
    }
    elem.hidden = false;
  }

  move(e, elem) {
    const line: any = document.querySelector('#line');
    const onePx = Math.ceil((this.max - this.min) / (line.offsetWidth - elem.offsetWidth));
    if (elem.id == 'point1') {
      let value = Math.ceil(elem.getBoundingClientRect().x - line.getBoundingClientRect().x) * onePx + this.min;
      if (value > this.max) { value = this.max; }
      this.price.minPrice = value;
    }
    if (elem.id == 'point2') {
      let value = (elem.getBoundingClientRect().x + elem.offsetWidth / 2 - line.getBoundingClientRect().x) * onePx;
      if (value < this.min) { value = this.min; }
      if (value == 119161) { value = this.max; }
      this.price.maxPrice = value;
    }
  }
}
