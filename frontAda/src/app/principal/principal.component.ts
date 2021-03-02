import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  postagem:Postagem = new Postagem()
  listaPostagem: Postagem[]
  
  tema:Tema = new Tema()
  listaTema:Tema[]
  tipoTema: string

  user:Usuario= new Usuario()

  idTema:number
  idUser = environment.id

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo


  constructor(
    private router: Router,
    private TemaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.findAllTema()
    this.findAllPostagem()

  }

  findAllTema(){
    this.TemaService.getAllTema().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
    })
  }

  tipoTheme(event: any){
    this.tipoTema = event.target.value
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp:Postagem[]) =>{
      this.listaPostagem = resp
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

  selecionar(){
    this.TemaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
    this.tema = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) =>{
      this.user = resp
    })
  }
  
  postar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem) =>{
      this.postagem = resp
      alert('Publicação realizada com sucesso!')
      this.postagem = new Postagem() //Fazer teste depois
      this.findAllPostagem()
    })
  }

}
