import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { SingleCocktailComponent } from './single-cocktail/single-cocktail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {path: 'cocktail', component: CocktailListComponent, canActivate: [AuthGuard]},
  {path: 'cocktail/:id', component: SingleCocktailComponent, canActivate: [AuthGuard]},
  {path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
