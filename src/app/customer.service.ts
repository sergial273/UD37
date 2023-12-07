import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private data:any[] = [];

  constructor() {}

  setData(data:any) {
    this.data.push({ ...data });
  }

  getData(){
    return this.data
  }
}
