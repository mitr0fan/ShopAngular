import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bicycle } from '../app/bicycle';

@Injectable({
  providedIn: 'root',
})
export class GetBicyclesService {
  constructor(public http: HttpClient) {}
  url = 'https://demo4164358.mockable.io/bicycles';

  public arrBicycles: Bicycle[] = [];

  public previousArr: Bicycle[];

  public currentBicycle: Bicycle;

  public bicycles: Bicycle[];

  private request(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getBicycles() {
    this.request(this.url).subscribe(value => {
      for (const key in value) {
        this.arrBicycles.push(value[key]);
      }
      this.arrBicycles.forEach(i => {
        i.price = i.price.replace(' ', '');
        i.price = +i.price;
        i.brand = i.name.split(' ')[0];
      });
    });
  }
}
