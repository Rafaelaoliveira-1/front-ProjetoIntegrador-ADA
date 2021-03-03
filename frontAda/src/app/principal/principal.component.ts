import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  user:Usuario = new Usuario()
  postagem:Postagem = new Postagem()
  tema:Tema = new Tema()

  listaPostagem:Postagem[]
  listaTema:Tema[]

  tipoTema: string
  tipoPostagem: string

  idTema:number
  idUser = environment.id
  idcheck:number

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo

  constructor(
    private router: Router,
    private TemaService: TemaService,
    private PostagemService: PostagemService
  ) {}

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.findAllTema()
    this.findAllPostagem()
  }

  findAllPostagem(){
    this.PostagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp.reverse()
    })
  }

  findAllTema(){
    this.TemaService.getAllTema().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
    })
  }

  tipoTheme(event: any){
    this.tipoTema = event.target.value
  }

  selecionar(event:any){
    this.idTema = event.target.id
    this.TemaService.getByIdTema(this.idTema).subscribe((resp:Tema) =>{
    this.tema = resp
    })
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

  postar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.PostagemService.postPostagem(this.postagem).subscribe((resp:Postagem) =>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.findAllPostagem()
    })
  }
}
