import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: RootContentComponent},
  {
    path: 'join-our-panel',
    // component: LoginComponent
    loadComponent: () => import('./login/login.component').then(res => res.LoginComponent)
  },
  {path: '**', redirectTo: '', pathMatch:  'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
