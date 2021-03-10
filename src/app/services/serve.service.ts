import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServeService {

  notas = Array<number>()

  constructor() { }

  postNotas(notas) {
    this.notas = notas
  }

  putNotas() {
    return this.notas
  }

}
