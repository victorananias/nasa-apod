import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';

const routes: Routes = [
  { path: ':date', component: PictureOfTheDayComponent },
  { path: '', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
