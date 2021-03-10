import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServeService } from 'src/app/services/serve.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit {

  notas = Array<number>()
  resumo = {}
  fGroup: FormGroup

  constructor(private serve:ServeService, private fBuilder:FormBuilder) { 
    this.notas = this.serve.putNotas() 

    this.resumo = [
      {
        nome: 'autonomia', valor: 'autonomia'
      },
      {
        nome: 'tempo de contato direto com o paciente', valor: 'tempodecontato'
      },
      {
        nome: 'dependência do paciente', valor: 'dependênciapaciente'
      },
      {
        nome: 'diversidade de patologias', valor: 'diversidade'
      },
      {
        nome: 'tempo livre', valor: 'tempolivre'
      },
      {
        nome: 'conhecimentos técnicos', valor: 'conhecimentos'
      },
      {
        nome: 'ganhos financeiros', valor: 'ganhos'
      },
      {
        nome: 'criatividade', valor: 'criatividade'
      },
      {
        nome: 'raciocinio lógico', valor: 'raciocinio'
      },
      {
        nome: 'relacionamento com outros colegas', valor: 'relacionamento'
      },
      { 
        nome: 'habilidade manual', valor: 'habilidade'
      },
      {
        nome: 'estresse', valor: 'estresse'
      },
      {
        nome: 'responsabilidade', valor: 'responsabilidade'
      },
      {
        nome: 'regularidade de horários', valor: 'regularidade'
      },
      {
        nome: 'segurança profissional', valor: 'segurança'
      },
      {
        nome: 'resultados', valor: 'resultados'
      },
      {
        nome: 'status', valor: 'status'
      }
    ]

    this.fGroup = this.fBuilder.group({
      'autonomia': this.notas[0],
      'tempodecontato': this.notas[1],
      'dependênciapaciente': this.notas[2],
      'diversidade': this.notas[3],
      'tempolivre': this.notas[4],
      'conhecimentos': this.notas[5],
      'ganhos': this.notas[6],
      'criatividade': this.notas[7],
      'raciocinio': this.notas[8],
      'relacionamento': this.notas[9],
      'habilidade': this.notas[10],
      'estresse': this.notas[11],
      'responsabilidade': this.notas[12],
      'regularidade': this.notas[13],
      'segurança': this.notas[14],
      'resultados': this.notas[15],
      'status': this.notas[16]
    })

  }

  ngOnInit() { }

  prosseguir() {
    
  }

}
