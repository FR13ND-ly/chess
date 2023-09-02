import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'play/:id', loadChildren: () => import('./playroom/playroom.module').then(m => m.PlayroomModule) },
  { path: 'join/:id', loadChildren: () => import('./playroom/playroom.module').then(m => m.PlayroomModule) , data: {join: true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
