import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolsNavigateComponent } from './components/home-page/tools-navigate/tools-navigate.component';
import { NoteComponent } from './components/tools-page/note/note.component';
import { PastpaperComponent } from './components/tools-page/pastpaper/pastpaper.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'toolspage', component: ToolsNavigateComponent},
  { path: 'toolspage/note', component: NoteComponent },
  { path: 'toolspage/pastpaper', component: PastpaperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
