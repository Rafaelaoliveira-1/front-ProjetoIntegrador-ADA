import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nomeCompleto = environment.nomeCompleto
  foto = environment.foto
  cargo = environment.cargo
  link = environment.link

  constructor (

    private router: Router, 

  ) { }

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou!')
      this.router.navigate(['/entrar'])
    } 

  }

}
