import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  z = []

  constructor() {}

  ngOnInit() {
    this.z[0] = JSON.parse(window.localStorage.getItem('teste0'))
    this.z[1] = JSON.parse(window.localStorage.getItem('teste1'))
    console.log(this.z)
  }
}
