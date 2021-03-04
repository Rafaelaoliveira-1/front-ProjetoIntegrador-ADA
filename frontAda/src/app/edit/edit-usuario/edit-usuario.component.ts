import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  foto = environment.foto
  usuario: Usuario = new Usuario
  postagem: Postagem = new Postagem
  idUser: number

  listaPostagem: Postagem[]
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findUserById(this.idUser)

    this.findAllPostagem()

  }

  findUserById(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  atualizar(){
    this.authService.putUser(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp

      for(let i of this.listaPostagem){
        console.log(i.usuario.id)
        if(i.usuario.id == 0){
          i.usuario.id = environment.id
        }
      }

      alert('Usuário atualizado com sucesso!')
      environment.token = ''
      
      if (environment.token == '') {
        alert('Sua sessão expirou!')
        this.router.navigate(['/entrar'])
      }
    })
  }
}
