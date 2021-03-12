import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServeService } from 'src/app/services/serve.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})

export class TesteComponent implements OnInit {
  
  perguntas = Array<any>('Autonomia é a capacidade do profissional de resolver seus casos médicos sem depender de outros especialistas. Esta autonomia seria pouco ou muito importante?',
  'Algumas especialidades envolvem um tempo maior de contato direto do médico com o paciente. Você gosta pouco ou muito deste relacionamento direto com o paciente?',
  'Em algumas especialidades é grande o grau de dependencia do paciente em relação ao médico. Você gostaria pouco ou muito de ter os pacientes dependentes de você?',
  'No dia-a-dia de sua especialidade você gostaria que houvesse uma grande diversidade de patologias? Isso é pouco ou muito importante para você?',
  'Que grau de importância você dá ao tempo livre que o especialista dispõe para dedicar a si mesmo e à sua família?',
  'Você gostaria de uma especialidade que exigisse muitos conhecimentos técnicos para o seu desempenho? Isso é pouco ou muito para você? Dê sua nota',
  'Que grau de importância você dá aos ganhos financeiros que uma especialidade pode permitir?',
  'Para VOCÊ é pouco ou muito importante que haja possibilidade do uso de criatividade no dia-a-dia da sua especialidade?',
  ' Algumas especialidades exigem maior desempenho intelectual, ou seja, exigem mais raciocinio lógico do especialista. VOCÊ gostaria pouco ou muito disso no seu trabalho diário?',
  'No desempenho diário de sua especialidade, VOCÊ desejaria ter de se relacionar pouco ou muito com outros colegas especialistas?',
  'VOCÊ gostaria de uma especialidade que exigisse pouco ou muita habilidade manual para o seu desempenho?',
  'Numa escala de zero a dez, qual o grau de estresse ao qual VOCÊ gostaria de estar submetido durante o desempenho da sua especialidade?',
  'Algumas especialidade exigem um grau maior de responsabilidade do profissional. Com que grau de responsabilidade VOCÊ gostaria de trabalhar?',
  'Que grau de importância VOCÊ dá à possibilidade de ter uma regularidade de horário no desempenho de sua especialidade?',
  'VOCÊ como médico de uma determinada especialidade se preocuparia pouco ou muito com a sua segurança profissional em relação ao futuro?',
  'Para VOCÊ é pouco ou muito importante trabalhar em uma especialidade na qual os resultados sejam claramente visiveis?',
  'Que importância VOCÊ dá ao "Status" que sua especialidade e VOCÊ mesmo pode alcançar junto à classe médica e à clientela?'
  )
  p:string = this.perguntas[0]
  n: number = 1
  t:number = this.perguntas.length
  nota:number
  notas = Array<number>()
  resumo = []
  titulo:string = 'Primeiro Passo: dê sua nota'
  fGroup: FormGroup
  z = [
    {name: 'Alergia e imunologia', valor: 0},
    {name: 'Anestesiologia', valor: 0},
    {name: 'Cardiologia', valor: 0}
  ]

  notasEspecialidades = [
    [8.46, 8.77, 8.51, 5.71, 7.11, 8.55, 5.72, 7.10, 6.10, 5.27, 3.75, 5.27, 8.80, 7.10, 5.71, 8.85, 5.22],
    [8.07, 8.38, 2.78, 6.42, 6.60, 8.48, 6.92, 7.25, 4.73, 8.45, 8.68, 8.13, 9.02, 3.93, 4.85, 7.95, 5.03],
    [8.00, 7.50, 7.05, 7.21, 4.55, 8.86, 6.60, 7.79, 5.40, 8.02, 6.59, 7.63, 8.83, 3.88, 5.33, 8.76, 7.50],
    [8.07, 8.56, 6.73, 7.30, 4.75, 8.13, 6.04, 7.45, 5.29, 7.66, 9.03, 8.04, 9.25, 2.66, 4.64, 9.03, 7.47],
    [8.82, 8.50, 6.76, 7.95, 5.44, 9.44, 7.63, 9.00, 5.50, 5.19, 9.52, 7.28, 9.59, 4.35, 5.39, 9.36, 7.68],
    [7.67, 8.61, 4.92, 6.86, 3.47, 9.67, 7.65, 8.50, 5.16, 8.06, 9.71, 9.12, 8.88, 2.00, 5.08, 9.43, 8.80],
    [7.84, 7.62, 7.99, 7.17, 5.42, 6.92, 4.42, 6.97, 5.91, 3.29, 4.25, 6.87, 8.42, 4.98, 4.87, 7.89, 6.19],
    [8.73, 6.98, 7.63, 6.81, 6.25, 8.98, 6.62, 6.76, 5.27, 6.86, 9.19, 7.52, 9.30, 4.70, 5.24, 9.24, 7.41],
    [7.55, 9.04, 8.24, 6.78, 7.77, 8.16, 6.53, 7.27, 5.18, 4.63, 7.22, 4.91, 8.95, 7.80, 6.51, 8.90, 5.32],
    [8.37, 7.41, 8.00, 7.54, 5.61, 8.48, 4.00, 8.11, 7.07, 7.28, 3.41, 5.65, 8.80, 6.00, 6.00, 8.76, 6.49],
    [7.97, 8.66, 7.18, 7.34, 4.89, 8.61, 6.32, 7.13, 5.63, 7.45, 8.74, 7.32, 8.61, 3.84, 4.47, 8.50, 7.29],
    [8.24, 6.98, 8.88, 7.82, 6.17, 6.59, 3.82, 7.80, 6.03, 7.68, 3.02, 6.44, 8.33, 5.78, 5.46, 8.02, 4.90],
    [8.42, 8.40, 7.60, 7.33, 5.37, 7.60, 6.16, 7.02, 4.53, 6.98, 7.81, 7.88, 8.60, 2.66, 5.54, 9.16, 6.79],
    [8.28, 7.85, 8.50, 7.78, 5.10, 8.51, 5.19, 8.10, 6.38, 6.15, 3.94, 7.87, 8.99, 4.66, 4.93, 8.37, 6.89],
    [8.38, 6.74, 6.71, 7.84, 5.60, 7.95, 3.58, 7.98, 6.57, 8.13, 2.65, 6.75, 8.23, 4.79, 5.37, 8.48, 6.40],
    [8.04, 8.05, 2.77, 8.30, 6.89, 5.54, 5.79, 7.39, 4.48, 7.08, 6.64, 8.47, 8.98, 4.25, 5.38, 6.69, 5.32],
    [7.43, 7.92, 7.70, 7.54, 6.50, 5.37, 3.90, 6.93, 3.99, 6.65, 4.91, 6.77, 8.39, 6.17, 5.68, 7.99, 4.88],
    [8.07, 7.31, 7.60, 7.72, 6.86, 6.29, 2.67, 7.32, 5.26, 7.24, 3.22, 6.10, 8.26, 6.05, 5.65, 8.11, 4.40],
    [7.85, 8.32, 7.75, 6.90, 7.56, 6.79, 5.46, 6.82, 5.13, 7.37, 4.56, 4.93, 7.86, 6.56, 5.23, 7.65, 4.17],
    [8.04, 7.71, 2.77, 8.30, 2.50, 8.68, 6.34, 7.98, 8.35, 8.30, 8.79, 7.88, 8.44, 5.80, 7.80, 8.80, 8.10],
    [7.40, 4.58, 3.00, 7.23, 6.85, 8.68, 6.62, 8.28, 5.78, 7.38, 5.13, 6.04, 8.47, 6.27, 4.75, 7.00, 5.98],
    [7.88, 3.54, 5.57, 8.23, 7.63, 6.73, 3.15, 8.21, 6.42, 6.56, 2.48, 5.56, 7.96, 6.95, 5.85, 7.70, 4,44],
    [7.97, 8.71, 8.55, 7.47, 5.16, 8.71, 6.08, 7.59, 5.82, 7.58, 5.16, 7.63, 8.61, 3.76, 5.19, 8.03, 8.05],
    [7.98, 8.62, 6.60, 6.80, 3.86, 9.32, 7.92, 7.86, 5.77, 6.80, 9.34, 8.90, 9.50, 3.17, 4.94, 8.72, 8.82],
    [8.09, 8.13, 7.70, 7.02, 4.83, 8.35, 5.18, 7.89, 7.09, 7.41, 3.83, 7.09, 8.91, 5.11, 5.54, 7.85, 7.39],
    [8.02, 8.84, 8.61, 6.04, 7.25, 8.88, 6.16, 6.96, 5.05, 4.48, 7.73, 6.32, 9.18, 6.79, 4.95, 8.89, 6.38],
    [8.38, 8.49, 8.58, 7.60, 4.70, 7.91, 6.09, 8.18, 5.66, 7.53, 3.86, 8.01, 8.74, 4.47, 5.10, 8.25, 7.41],
    [8.26, 8.50, 7.89, 7.55, 4.71, 8.54, 7.76, 8.26, 5.43, 6.46, 9.16, 8.00, 9.35, 3.57, 5.03, 9.18, 8.03],
    [8.57, 8.78, 7.41, 7.43, 6.25, 8.49, 6.29, 7.35, 5.85, 5.62, 8.48, 6.43, 9.10, 5.72, 5.11, 8.94, 6.98],
    [7.24, 3.41, 2.99, 6.93, 7.38, 8.00, 5.27, 7.32, 5.34, 7.57, 5.24, 6.38, 8.91, 6.89, 4.70, 7.44, 5.62],
    [8.27, 8.05, 8.33, 6.90, 6.35, 6.47, 3.07, 6.90, 5.21, 6.87, 3.33, 6.54, 8.49, 4.90, 5.81, 8.16, 4.86],
    [8.59, 7.95, 7.77, 7.69, 5.20, 7.85, 5.66, 7.47, 5.63, 8.22, 6.43, 8.01, 8.57, 3.18, 5.42, 8.42, 7.46],
    [7.98, 8.30, 8.65, 7.33, 6.86, 7.49, 3.76, 7.62, 6.52, 5.03, 2.05, 6.81, 8.73, 6.44, 5.27, 7.87, 3.97],
    [6.94, 4.13, 5.57, 7.60, 7.90, 7.69, 7.60, 7.90, 6.11, 6.98, 5.79, 6.57, 8.54, 5.58, 4.62, 6.98, 6.75],
    [7.89, 7.97, 9.17, 6.92, 6.90, 7.44, 3.60, 7.60, 6.75, 6.16, 4.19, 5.65, 8.57, 6.76, 5.00, 7.92, 5.37],
    [8.09, 9.00, 8.38, 7.16, 6.14, 8.36, 6.79, 7.38, 5.80, 6.72, 8.52, 6.74, 9.40, 4.48, 5.35, 9.00, 7.30]
  ]
  

  /*
  p: pergunta
  n: número da pergunta
  t: quantidade de perguntas
  z: resultado e especialidades
  */

  constructor(public router:Router, private serve:ServeService, private fBuilder:FormBuilder) { }
  
  ngOnInit() {

    this.resumo = [
      {
        nome: 'autonomia', valor: 0
      },
      {
        nome: 'tempo de contato direto com o paciente', valor: 1
      },
      {
        nome: 'dependência do paciente', valor: 2
      },
      {
        nome: 'diversidade de patologias', valor: 3
      },
      {
        nome: 'tempo livre', valor: 4
      },
      {
        nome: 'conhecimentos técnicos', valor: 5
      },
      {
        nome: 'ganhos financeiros', valor: 6
      },
      {
        nome: 'criatividade', valor: 7
      },
      {
        nome: 'raciocinio lógico', valor: 8
      },
      {
        nome: 'relacionamento com outros colegas', valor: 9
      },
      { 
        nome: 'habilidade manual', valor:10
      },
      {
        nome: 'estresse', valor: 11
      },
      {
        nome: 'responsabilidade', valor: 12
      },
      {
        nome: 'regularidade de horários', valor: 13
      },
      {
        nome: 'segurança profissional', valor: 14
      },
      {
        nome: 'resultados', valor: 15
      },
      {
        nome: 'status', valor: 16
      }
    ]

    this.fGroup = this.fBuilder.group({
      0: this.notas[0],
      1: this.notas[1],
      2: this.notas[2],
      3: this.notas[3],
      4: this.notas[4],
      5: this.notas[5],
      6: this.notas[6],
      7: this.notas[7],
      8: this.notas[8],
      9: this.notas[9],
      10: this.notas[10],
      11: this.notas[11],
      12: this.notas[12],
      13: this.notas[13],
      14: this.notas[14],
      15: this.notas[15],
      16: this.notas[16]
    })
  }

  prox() { 
    if(this.nota === null || this.nota === undefined || this. nota < 0) {
      this.nota = 0
    } else if (this.nota > 10) {
      this.nota = 10
    }

    this.notas.push(this.nota)

    if(this.n >= 17) {
      document.getElementById('att').remove()
      document.getElementById('form').className = "d-block"
      this.titulo = 'Segundo passo: análise de coerência'
      this.ngOnInit()
    }

    this.nota = null
    this.n++
    this.p = this.perguntas[this.n-1]
  }

  voltar() {
    if(this.n > 1) {
      this.notas.pop()
      console.log(this.notas)
      this.n--
      this.p = this.perguntas[this.n-1]
    } else {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  convertArray() {
    let newNotas = Array<number>()
    newNotas.push(this.fGroup.value)
  }

  prosseguir() {
    for (let i = 0; i < 3; i++) {
      for(let j = 0; j < 17; j++) {
        this.z[i].valor += Math.abs(this.fGroup.value[j] - this.notasEspecialidades[i][j])
      }
  
      let convert = this.z[i].valor.toFixed(2)
      this.z[i].valor = parseFloat(convert)
      this.z[i].valor = 100 - this.z[i].valor
    }

    this.z.sort(function(a, b) {
      return a.valor > b.valor ? -1 : (a.valor < a.valor ? 1 : 0) 
    })
    
    document.getElementById('form').remove()
    document.getElementById('result').className = "d-block"
    this.titulo = 'resultado do teste'
    console.log(this.z)
  }


}
