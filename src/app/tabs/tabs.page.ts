import { Component } from '@angular/core';
import { faHome, faHistory, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ServeService } from '../services/serve.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  faHome= faHome;
  faHistory= faHistory;
  faEdit= faEdit;

  constructor(private serve:ServeService) {}

  ngOnInit() {
    let histo = document.getElementById('histo')
    let home = document.getElementById('home')
    let edit = document.getElementById('edit')
    this.serve.postMenu(histo, home, edit)

    if(window.location.pathname.toString() == '/tabs/tab1') {
      this.selectMenu('edit')
    }
  }

  selectMenu(nome) {
    this.serve.alteraMenu(nome)
  }

}
