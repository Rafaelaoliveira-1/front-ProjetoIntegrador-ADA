import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-postagem',
  templateUrl: './edit-postagem.component.html',
  styleUrls: ['./edit-postagem.component.css']
})
export class EditPostagemComponent implements OnInit {

  foto = environment.foto
  nomeCompleto = environment.nomeCompleto
  cargo = environment.cargo

  constructor() { }

  ngOnInit() {
  }

  atualizar(){
    
  }

}
