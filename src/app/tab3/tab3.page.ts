import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  card = []
  idTeste = window.localStorage.length - 1
  cardHisto = []

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    for(let i = 0; i < parseInt(window.localStorage.getItem('id')); i++ ){
      this.card[i] = [{
        titulo: 'Teste ' + (i+1), teste: JSON.parse(window.localStorage.getItem('teste' + i)) 
      }]
    }  
    //console.log(this.card[0][0].teste)

    if(window.localStorage.getItem('id') !== '0' ) {
      document.getElementById('clean').className = 'btn d-block'
      document.getElementById('texto').className = 'text-secondary d-none'
    }
  }

  visualizar(id) {
    document.getElementById('histo').className = "d-none"
    document.getElementById('oneHisto').className = "d-block"

    this.cardHisto = id[0].teste
    console.log(this.cardHisto)
  }

  voltar() {
    document.getElementById('histo').className = "d-block"
    document.getElementById('oneHisto').className = "d-none"
  }

  delete(id) {
    id = id[0].titulo
    for(let i = 1; i <= 5; i++) {
      if(id == 'Teste '+ i) {
        let x = i - 1
        if(window.localStorage.getItem('teste' + (x+1))){
          for(var j = x; j < window.localStorage.length - 2; j++) {
            window.localStorage.setItem('teste' + j, window.localStorage.getItem('teste' + (j+1)))
          }
          window.localStorage.removeItem('teste' + j)
        } else {
          window.localStorage.removeItem('teste' + x)
        }
      }
    }   

    let idStorage = parseInt(window.localStorage.getItem('id')) - 1
    window.localStorage.setItem('id', idStorage.toString())
    window.location.reload()
  }

  imprimir() {
    
  }

  async deleteAlert(id) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message:'Deseja excluir esse item?',
      buttons: [
        { 
          text: 'Cancelar', 
          cssClass: 'text-danger'
        },
        {
          text: 'OK',
          cssClass: 'text-primary',
          handler: () => {
            this.delete(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async cleanAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message:'Deseja limpar o histórico?',
      buttons: [
        { 
          text: 'Cancelar', 
          cssClass: 'text-danger'
        },
        {
          text: 'OK',
          cssClass: 'text-primary',
          handler: () => {
            window.localStorage.clear()
            window.localStorage.setItem('id', '0')
            window.location.reload()
          }
        }
      ]
    });

    await alert.present();
  }
}
