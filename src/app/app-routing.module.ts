import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: ':date', component: PictureOfTheDayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
