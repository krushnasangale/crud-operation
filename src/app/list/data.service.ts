import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private info = new BehaviorSubject<string>("default data");

  public shareData = this.info.asObservable();

  constructor() { }

  updateData(text: string){
    this.info.next(text)
  }
}
