import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { NewsApiService } from '../service/newsApi.service';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';

import { TemaService } from '../service/tema.service';
import { AuthService } from '../service/auth.service';

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
  listaTemaModal:Tema[]
  listaNoticia: any[]
  listaUsuario:Usuario[]
  listaConexao:Usuario[]
  indice:number

  busca: string

  tipoTema: string
  tipoPostagem: string

  idTema:number
  idPostagem:number
  idUser = environment.id
  idcheck:number

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo
  id = environment.id

  key = 'dataHora'
  reverse = true

  constructor(
    private router: Router,
    private auth: AuthService,
    private TemaService: TemaService,
    private PostagemService: PostagemService,
    private NewsApiService: NewsApiService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.getNews()

    this.findAllPostagem()
    this.findAllTema()
    this.findAllUsuario()
  }

  findAllPostagem(){
    this.PostagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp.reverse()
    })
  }

  findAllTema(){
    this.TemaService.getAllTema().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
      this.listaTemaModal = resp.reverse()
    })
  }

  findAllUsuario(){
    this.auth.getAllUser().subscribe((resp:Usuario[])=>{
      this.listaUsuario = resp
      this.listaUsuario.splice(environment.id-1,1)
      this.listaUsuario = this.listaUsuario.slice(0,6)
    })
  }

  tipoTheme(event: any){
    this.tipoTema = event.target.value
  }
  // implementação
  // editarPostagem(event:any){
  // this.idPostagem = event.target.id
  //  console.log(this.idPostagem)
  // }

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
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.findAllPostagem()
    })
  }

  findByDescricaoPostagem() {
    if (this.busca == '') {
      this.findAllPostagem()
    } else {
      this.PostagemService.getByDescricaoPostagem(this.busca).subscribe((resp: Postagem[]) => {
        this.listaPostagem = resp
      })
    }
  }
  getNews() {
    this.NewsApiService.getNoticias().subscribe(resp => {
      let articlesResult = resp.articles.slice(1, 4);
      this.listaNoticia = articlesResult
    })
  }

  // findByDescricaoTema() {
  //   if (this.busca == '') {
  //     this.findAllTema()
  //   } else {
  //     this.TemaService.getByDescricaoTema(this.busca).subscribe((resp: Tema[]) => {
  //       this.listaTema = resp
  //     })
  //   }
  // }

  // findByTipoTema() {
  //   if (this.busca == '') {
  //     this.findAllTema()
  //   } else {
  //     this.TemaService.getByTipoTema(this.busca).subscribe((resp: Tema[]) => {
  //     this.listaTema=this.listaTema.concat(resp)
  //     this.listaTema = this.listaTema.reverse()
  //     })
  //     }
  //   }

}
