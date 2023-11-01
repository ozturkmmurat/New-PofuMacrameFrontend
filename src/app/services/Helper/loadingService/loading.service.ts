import { Injectable, signal } from '@angular/core';
import { Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean = false;
  private loadingElement : boolean = true;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setLoadingElement(loadingElement : boolean){
    this.loadingElement = loadingElement
  }

  getLoadingElement() : boolean{
    return this.loadingElement;
  }
}
