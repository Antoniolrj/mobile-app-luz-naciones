import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './components/post-details/post-details.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent, MenuItemComponent, MenuComponent, PostComponent, PostDetailsComponent, HomeComponent],
  imports: [BrowserModule, RouterModule.forRoot([]), IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
