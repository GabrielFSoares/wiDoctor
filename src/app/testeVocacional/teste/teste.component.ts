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
  fGroup: FormGroup
  z = [
    {name: 'Alergia e imunologia', valor: 0},
    {name: 'Anestesiologia', valor: 0},
    {name: 'Cardiologia', valor: 0}
  ]

  notasEspecialidades = [
    [8.46, 8.77, 8.51, 5.71],
    [8.07, 8.38, 2.78, 6.42],
    [8.53, 8.28, 5.8, 9.42]
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
      for(let j = 0; j < 3; j++) {
        this.z[i].valor += this.fGroup.value[j] - this.notasEspecialidades[i][j]
      }
      let convert = this.z[i].valor.toFixed(2)
      this.z[i].valor = parseFloat(convert)
    }

    this.z.sort(function(a, b) {
      return a.valor < b.valor ? -1 : (a.valor > a.valor ? 1 : 0) 
    })
    
    document.getElementById('form').remove()
    document.getElementById('result').className = "d-block"
    console.log(this.z)
  }


}
