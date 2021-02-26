import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  nome = window.document.getElementById('nome')
  validaNome: string
  validaSenha: string
  usuario: Usuario = new Usuario
  tipoUsuario: string

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  validarNome(event: any){
    this.validaNome = event.target.value
  }

  confirmaSenha(event: any){
    this.validaSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
   this.usuario.tipo = this.tipoUsuario
    
   console.log(this.validaSenha)
   console.log(this.usuario.senha)

   if(this.usuario.senha != this.validaSenha){
     alert('As senhas cadastradas não são iguais.')
   }
   else if(this.validaNome.length < 1){
    alert('Preencha corretamente o campo nome!')
   }
   else{
     this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
       this.usuario = resp

       this.router.navigate(['/entrar'])
       alert('Cadastro realizado com sucesso!')
     })
   }
  }
}
