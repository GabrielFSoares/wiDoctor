import { Component } from '@angular/core';
import { faHome, faHistory, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  faHome= faHome;
  faHistory= faHistory;
  faEdit= faEdit;

  constructor() {}

  selectMenu(nome) {
    let histo = document.getElementById('histo')
    let home = document.getElementById('home')
    let edit = document.getElementById('edit')

    if(nome === 'histo') {
      histo.className = 'fa-2x text-danger'
      home.className = 'fa-2x text-secondary'
      edit.className = 'fa-2x text-secondary'
    } else if(nome === 'home') {
      histo.className = 'fa-2x text-secondary'
      home.className = 'fa-2x text-danger'
      edit.className = 'fa-2x text-secondary'
    } else if(nome === 'edit') {
      histo.className = 'fa-2x text-secondary'
      home.className = 'fa-2x text-secondary'
      edit.className = 'fa-2x text-danger'
    }
  }

}
