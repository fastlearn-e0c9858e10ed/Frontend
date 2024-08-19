import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { FooterPageComponent } from './components/footer-page/footer-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { MatMenuModule } from '@angular/material/menu';
import { DrawerPageComponent } from './components/drawer-page/drawer-page.component';
import { IntroductionComponent } from './components/home-page/introduction/introduction.component';
import { NewsSliderComponent } from './components/home-page/news-slider/news-slider.component';
import { ToolsNavigateComponent } from './components/home-page/tools-navigate/tools-navigate.component';
import { DatabaseNavigateComponent } from './components/home-page/database-navigate/database-navigate.component';
import { ToolsPageComponent } from './components/tools-page/tools-page.component';
import { PastpaperComponent } from './components/tools-page/pastpaper/pastpaper.component';
import { NoteComponent } from './components/tools-page/note/note.component';
import { SettingPageComponent } from './components/setting-page/setting-page.component';
import { AboutusPageComponent } from './components/aboutus-page/aboutus-page.component';
import { DatabasePageComponent } from './components/database-page/database-page.component';
import { PastpaperdbComponent } from './components/database-page/pastpaperdb/pastpaperdb.component';
import { NotedbComponent } from './components/database-page/notedb/notedb.component';
import { RedirectHomepageComponent } from './components/tools-page/redirect-homepage/redirect-homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    FooterPageComponent,
    HomePageComponent,
    DrawerPageComponent,
    IntroductionComponent,
    NewsSliderComponent,
    ToolsNavigateComponent,
    DatabaseNavigateComponent,
    ToolsPageComponent,
    PastpaperComponent,
    NoteComponent,
    SettingPageComponent,
    AboutusPageComponent,
    DatabasePageComponent,
    PastpaperdbComponent,
    NotedbComponent,
    RedirectHomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
