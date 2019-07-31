import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bicycle } from '../app/bicycle';

@Injectable({
  providedIn: 'root'
})
export class GetBicyclesService {
  url='http://demo4164358.mockable.io/bicycles';
  constructor(public http : HttpClient) { }

  private request() :Observable<any> {
    return this.http.get(this.url);
  }  

  public arrBicycles : Bicycle[] = [];

  public previousArr : Bicycle[];

  public currentBicycle : Bicycle;

  public bicycles : Bicycle[];

  public getBicycles() {
    this.request()
    .subscribe((value) => {
      for(let key in value) {
        this.arrBicycles.push(value[key]);
      }
      this.arrBicycles.forEach(function(i){
        i.price=i.price.replace(' ','');
        i.price=+i.price;
        i.brand=i.name.split(' ')[0];
      })
    });
  }
}
