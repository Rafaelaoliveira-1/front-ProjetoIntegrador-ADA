import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
 
  {path:'entrar',component:EntrarComponent},
  {path:'cadastrar', component:CadastrarComponent},
  {path:'principal', component: PrincipalComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
