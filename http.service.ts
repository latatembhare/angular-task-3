import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
 private refresh$ = new Subject<void>()
 get refresh(){
  return this.refresh$
 }
  postProduct(product: any) {
    this.http
      .post(
        'https://task-3-101d0-default-rtdb.firebaseio.com/section.json',
        product
      )
      .pipe(tap(()=>{
        this.refresh.next()
      }))
      .subscribe({
        next: (param: any) => {
          console.log(param);
        },
      });
  }
  getProduct() {
    return this.http
      .get('https://task-3-101d0-default-rtdb.firebaseio.com/section.json')
      .pipe(
        map((res: any) => {
          const productArr = [];
          for (let productId in res) {
            productArr.push({ ...res[productId] });
          }
          console.log(productArr);
          return productArr;
        })
      );
  }
}
