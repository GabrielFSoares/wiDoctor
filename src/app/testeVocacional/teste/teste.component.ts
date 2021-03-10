import { Component, OnInit } from '@angular/core';
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

  /*
  p: pergunta
  n: número da pergunta
  t: quantidade de perguntas
  */

  constructor(public router:Router, private serve:ServeService) { }
  
  ngOnInit() {}

  prox() { 
    if(this.nota === null || this.nota === undefined || this. nota < 0) {
      this.nota = 0
    } else if (this.nota > 10) {
      this.nota = 10
    }

    this.notas.push(this.nota)

    if(this.n >= 17) {
      this.serve.postNotas(this.notas)
      this.router.navigate(['/resumo'])
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

}
