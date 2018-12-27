import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: ':date', component: PictureOfTheDayComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
