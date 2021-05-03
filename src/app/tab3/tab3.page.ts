import { Component } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
const { Filesystem, Share} = Plugins;
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  faTrash = faTrash
  faDownload = faDownload
  card = []
  idTeste = window.localStorage.length - 1
  cardHisto = []
  pdf = null

  constructor(public alertController: AlertController, private socialSharing: SocialSharing,
    private document: DocumentViewer, private file: File, private transfer: FileTransfer, 
    private toastCtrl: ToastController, private platform: Platform, private fileOpener: FileOpener) {}

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

  share() {
    let self = this
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    let pdfDefinition = {
      content: [
        {
          columns: [
            {
              text: 'Teste Vocacional - Resultado', style: 'header'
            },
            {
              image: 'building', width: 100
            }
          ]
        },
        {
          style: 'pdf',
          table: {
            widths: ['*', 'auto'],
            body: [
              ['Especialidade', 'Probabilidade de Acerto'],
              ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],
              ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],
              ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['','']
            ]
          }
        }],

        styles: {
          pdf: {
            margin: [0, 0, 0, 0]
          },
          header: {
            fontSize: 18,
			      bold: true,
            margin: [0, 0, 0, 15]
          },
        },
        images: {
          building: 'data:image/png;base64,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'
        }
    }

    for(let i = 1; i<=36; i++) {
      for(let j = 0; j<1; j++) {
        pdfDefinition.content[1].table.body[i][j] = this.cardHisto[i-1].name 
        pdfDefinition.content[1].table.body[i][j+1] = this.cardHisto[i-1].valor + '%'
      }
    }

    this.pdf = pdfMake.createPdf(pdfDefinition)
    
    if(this.platform.is('cordova')) {
      this.pdf.getBase64(async (data) => {
        try{
          let path = `pdfs/TesteVocacinal.pdf`

          const result = await Filesystem.writeFile({
            path,
            data: data,
            directory: FilesystemDirectory.Documents,
            recursive: true
          })
          this.fileOpener.open(`${result.uri}`, 'application/pdf')
        } catch(e) {
          console.log('Erro: ', e)
        }
      })
    } else {
      this.pdf.download('TesteVocacional.pdf')
    }

  }

  async deleteAlert(id) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message:'Deseja excluir esse item? ' + id,
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
