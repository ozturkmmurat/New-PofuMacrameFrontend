import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key : string){
    return localStorage.getItem(key)
  }

  add(key: string, value:any){
    return localStorage.setItem(key,JSON.stringify(value))
  }
  update(key: string, value:any){
    localStorage.removeItem(key)
    localStorage.setItem(key,JSON.stringify(value))
  }
  remove(key : string){
    return localStorage.removeItem(key)
  }
}
