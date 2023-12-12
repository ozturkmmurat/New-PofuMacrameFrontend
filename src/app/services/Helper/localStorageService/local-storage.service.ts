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
    return localStorage.setItem(key,value)
  }

  addJson(key:string , value:any){
    return localStorage.setItem(key,JSON.stringify(value))
  }

  update(key: string, value:any){
    localStorage.removeItem(key)
    localStorage.setItem(key,value)
  }

  updateJson(key: string, value:any){
    localStorage.removeItem(key)
    localStorage.setItem(key,JSON.stringify(value))
  }
  

  remove(key : string){
    return localStorage.removeItem(key)
  }

  signOut(){
    this.removeTokens();
  }

  removeTokens(){
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("refreshToken")

  }

  isAuthenticated() {
    if (localStorage.getItem("token")){
      return true;
    }
    else {
      return false;
    }
  }
  
  getToken() {
    return this.getItem("token")
  }

  getRefreshToken(){
    return this.getItem("refreshToken")
  }

  getTokenExpiration(){
    return this.getItem("expiration")
  }

  setToken(value:string){
    return localStorage.setItem("token",value)
  }

  setRefreshToken(value:string){
    return localStorage.setItem("refreshToken",value)
  }
  setTokenExpiration(value:string){
    return localStorage.setItem("expiration",value)
  }
}
