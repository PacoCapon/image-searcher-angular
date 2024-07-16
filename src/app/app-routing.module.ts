import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ImageDetailsComponent } from './image-details/image-details.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'image/:id', component: ImageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
