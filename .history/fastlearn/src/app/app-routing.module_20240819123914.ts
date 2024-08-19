import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolsNavigateComponent } from './components/home-page/tools-navigate/tools-navigate.component';
import { NoteComponent } from './components/tools-page/note/note.component';
import { PastpaperComponent } from './components/tools-page/pastpaper/pastpaper.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  {
    path: 'toolspage',
    component: ToolsNavigateComponent,
    children: [
      { path: 'note', component: NoteComponent },
      { path: 'pastpaper', component: PastpaperComponent }
    ]
  },
  // You can add a wildcard route to handle undefined routes
  { path: '**', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
