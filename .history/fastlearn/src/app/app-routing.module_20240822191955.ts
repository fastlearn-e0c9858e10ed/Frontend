import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolsNavigateComponent } from './components/home-page/tools-navigate/tools-navigate.component';
import { NoteComponent } from './components/tools-page/note/note.component';
import { PastpaperComponent } from './components/tools-page/pastpaper/pastpaper.component';
import { ToolsPageComponent } from './components/tools-page/tools-page.component';
import { SettingPageComponent } from './components/setting-page/setting-page.component';
import { AboutusPageComponent } from './components/aboutus-page/aboutus-page.component';
import { PastpaperdbComponent } from './components/database-page/pastpaperdb/pastpaperdb.component';
import { NotedbComponent } from './components/database-page/notedb/notedb.component';
import { AddsubjectComponent } from './components/addsubject/addsubject.component';
import { AskpromptComponent } from './components/askprompt/askprompt.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'toolspage/note', component: NoteComponent},
  { path: 'toolspage/pastpapers', component: PastpaperComponent},
  { path: 'pastpapers', component: PastpaperComponent},
  { path: 'note', component: NoteComponent},
  { path: 'settingpage', component:SettingPageComponent},
  { path: 'aboutus', component:AboutusPageComponent},
  { path: 'pastpaperdb', component:PastpaperdbComponent },
  { path: 'notedb', component: NotedbComponent},
  { path: 'database-page/notedb', component: NotedbComponent },
  { path: 'database-page/pastpaperdb', component: PastpaperdbComponent },
  { path: 'addsubject',component: AddsubjectComponent},
  {path:  'askprompt',component: AskpromptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
