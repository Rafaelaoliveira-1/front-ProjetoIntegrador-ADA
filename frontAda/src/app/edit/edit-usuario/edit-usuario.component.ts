import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  foto = environment.foto
  usuario: Usuario = new Usuario
  idUser: number
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){

    this.idUser = this.route.snapshot.params['id']
    this.findUserById(this.idUser)

    console.log(environment.nomeCompleto)
    console.log(environment.cargo)
    console.log(environment.foto)
    console.log(environment.link)
  }

  findUserById(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  atualizar(){
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(['/perfil'])
      alert('Usuário atualizado com sucesso, faça o login novamente.')
      environment.token = ''
      environment.nomeCompleto = ''
      environment.foto = ''
      environment.id = 0
      this.router.navigate(['/entrar'])
    })
  }
}
