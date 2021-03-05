import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-postagem',
  templateUrl: './edit-postagem.component.html',
  styleUrls: ['./edit-postagem.component.css']
})
export class EditPostagemComponent implements OnInit {

  postagem:Postagem = new Postagem()
  tema:Tema = new Tema ()
  foto = environment.foto
  nomeCompleto = environment.nomeCompleto
  cargo = environment.cargo
  idPostagem: number
  idTema:number
  atualizarTemaPostagem: string
  tipoTema: string
  // data: Date = new Date()

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private PostagemService: PostagemService,
    private TemaService: TemaService

  ) { }

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id:number){
    this.PostagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
      this.postagem = resp
      this.idTema = this.postagem.tema.id
    })
  }
  
  atualizarTema(){
    this.TemaService.putTema(this.tema).subscribe((resp:Tema)=>{
      this.tema = resp
      alert('Tema atualizada com sucesso')
    })
  }
  
  atualizar(){
    this.PostagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem atualizada com sucesso')
      this.router.navigate(['/perfil'])
    })
  }
}
