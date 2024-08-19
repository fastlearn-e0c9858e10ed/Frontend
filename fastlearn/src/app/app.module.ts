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
    PastpaperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
