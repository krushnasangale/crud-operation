import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardviewComponent } from './cardview/cardview.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListviewComponent } from './listview/listview.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent, children:[
    {path: 'cardview', component: CardviewComponent},
    {path: 'listview', component: ListviewComponent},
    {path: '', component: CardviewComponent}
  ]},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
