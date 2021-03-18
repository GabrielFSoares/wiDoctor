import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServeService {

  histo 
  home 
  edit 

  constructor() { }

  postMenu(histo, home, edit) {
    this.histo = histo
    this.home = home
    this.edit = edit
  }

  alteraMenu(nome) {
    if(nome === 'histo') {
      this.histo.className = 'fa-2x text-danger'
      this.home.className = 'fa-2x text-secondary'
      this.edit.className = 'fa-2x text-secondary'
    } else if(nome === 'home') {
      this.histo.className = 'fa-2x text-secondary'
      this.home.className = 'fa-2x text-danger'
      this.edit.className = 'fa-2x text-secondary'
    } else if(nome === 'edit') {
      this.histo.className = 'fa-2x text-secondary'
      this.home.className = 'fa-2x text-secondary'
      this.edit.className = 'fa-2x text-danger'
    }
  }

}
