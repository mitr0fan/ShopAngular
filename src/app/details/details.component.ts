import { Component, OnInit } from '@angular/core';
import { GetBicyclesService } from '../get-bicycles.service';
import { Bicycle } from '../bicycle';
import { AddToBasketService } from '../add-to-basket.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /*bicycle : Bicycle;
  empty={
    fullName:'Выберите велосипед',
    imageSrc:'',
    price:'',
    name:'',
    description:{},
    brand:''
  };*/

  constructor( private getBicycles : GetBicyclesService, private add : AddToBasketService ) { }

  arr=[];

  ngOnInit() {
    if(this.getBicycles.currentBicycle!=undefined) {
  
      for(let key in this.getBicycles.currentBicycle.description) {
        let obj={name: key, property: this.getBicycles.currentBicycle.description[key]};
        this.arr.push(obj);
      }
    }
  }

  changeBicycle(elem:HTMLElement) {
    let num;
    if(this.getBicycles.bicycles!=undefined) {
      this.getBicycles.bicycles.forEach((item, i)=> {
        if(item.name==this.getBicycles.currentBicycle.name) {
          num=i;
        }
      });
      if(elem.id=='previous' && num>0) {
        this.getBicycles.currentBicycle=this.getBicycles.bicycles[num-1];
      }
      if(elem.id=='next' && num<this.getBicycles.bicycles.length-1) {
        this.getBicycles.currentBicycle=this.getBicycles.bicycles[num+1];
      }
      this.arr=[];
      for(let key in this.getBicycles.currentBicycle.description) {
        let obj={name:key, property:this.getBicycles.currentBicycle.description[key]};
        this.arr.push(obj);
      }
    }
  }

  zoom(event, img, bigImg, div) {
    img.style.left=-(event.clientX-bigImg.getBoundingClientRect().left)*2+
    div.offsetHeight/2+'px';

    img.style.top=-(event.clientY-bigImg.getBoundingClientRect().top)*2+
    div.offsetHeight/2+'px';

    div.style.left=event.clientX-bigImg.getBoundingClientRect().left+div.offsetHeight+'px';
    div.style.top=event.clientY-bigImg.getBoundingClientRect().top+'px';

  }
}
