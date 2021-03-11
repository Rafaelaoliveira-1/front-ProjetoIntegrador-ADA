import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-conexao',
  templateUrl: './conexao.component.html',
  styleUrls: ['./conexao.component.css']
})
export class ConexaoComponent implements OnInit {

  idConexao: number
  user:Usuario = new Usuario()
  listaPostagem: Postagem[]
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService,
    private auth: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    
    window.scroll(0,0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }
    this.idConexao = this.route.snapshot.params['id']
    this.findByIdUser()
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idConexao).subscribe((resp: Usuario)=>{
      this.user = resp
      this.listaPostagem = this.user.postagem.reverse()
    })
  }
}
