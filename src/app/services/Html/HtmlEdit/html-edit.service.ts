import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlEditService {

  constructor() { }

  deleteClass(id:string, className:string, removeClassName:string){
    if (removeClassName !=null || removeClassName != "undefined") {
      if(id !=null || id != "undefined"){
        document.getElementById(id)?.classList.remove(removeClassName);
      }
      else if(className !=null || className != "undefined"){
        var elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove(removeClassName);
        }
      }
    }
  }
}
