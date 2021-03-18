import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private serve:ServeService, public router:Router) {}

  navigate() {
    this.router.navigate(['/tabs/tab1']);
    this.serve.alteraMenu('edit')
  }

}
