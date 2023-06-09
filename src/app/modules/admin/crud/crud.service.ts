import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  routeParams: any;
  productApi = `https://loyaltyapi.cellcard.com.kh/api/products`;
  products: any[];
  product: any;
  categoryApi = `https://loyaltyapi.cellcard.com.kh/api/categories`;
  categories: any[];
  subCategoryApi = `https://loyaltyapi.cellcard.com.kh/api/subcategories`;
  subCategories: any[];

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    this.routeParams = route.params;

    if(this.routeParams.id !== undefined){
      return new Promise<void>((resolve, reject) => {
        Promise.all([
            this.getProductById()
        ]).then(
            () => {
                resolve();
            },
            reject
        );
      });
    } else {
      return new Promise<void>((resolve, reject) => {
        Promise.all([
            this.getAllProducts()

        ]).then(
            () => {
                resolve();
            },
            reject
        );
      });
    }
  }

  getAllProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.productApi)
          .subscribe((response: any) => {
              this.products = response;
              resolve(response);
          }, reject);
    });
  }

  getProductById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.productApi+'/'+ this.routeParams.id)
          .subscribe((response: any) => {
              this.product = response;
              resolve(response);
          }, reject);
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.categoryApi)
          .subscribe((response: any) => {
              this.categories = response;
              resolve(response);
          }, reject);
    });
  }


  getSubCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.subCategoryApi)
          .subscribe((response: any) => {
              this.subCategories = response;
              resolve(response);
          }, reject);
    });
  }

  addData(data): Observable<any> {
    return this._httpClient.post(this.productApi, data);
  }

  updateData(data: any): Observable<any> {
    // data.id = data.productId;
    // data.productId 
    // return this._httpClient.put(this.productApi+'/'+ data.id, data);
    return this._httpClient.put(this.productApi, data);
  }

  deleteData(data: any): Observable<any> {
    return this._httpClient.delete(this.productApi+'/'+ {body: data});
  }

}
