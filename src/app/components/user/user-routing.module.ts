import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/logged-in.guard';

import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrazioneComponent } from "./registrazione/registrazione.component";
import { UserComponent } from "./user.component";

const routes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: 'registrazione', component: RegistrazioneComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
    { path: '', pathMatch: 'full', component: RegistrazioneComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
