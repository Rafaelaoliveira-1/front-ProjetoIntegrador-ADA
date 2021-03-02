import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  tema:Tema = new Tema()
  listaTema:Tema[]
  tipoTema: string

  tipoPostagem: string

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo
  id = environment.id


  constructor(
    private router: Router,
    private TemaService: TemaService
  ) {}

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.findAllTema()
  }

  findAllTema(){
    this.TemaService.getAllTema().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
    })
  }

  tipoTheme(event: any){
    this.tipoTema = event.target.value
  }

  cadastrar(){
    this.tema.tipoTema = this.tipoTema

    this.TemaService.postTema(this.tema).subscribe((resp:Tema) =>{
      this.tema = resp
      alert('Cadastrado com sucesso!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }

}
